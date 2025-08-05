import { useRef, useState } from 'react'
import useTitle from '@/hooks/useTitle'
import styles from './coze.module.css'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from '@react-vant/icons'

const Coze = () => {
    useTitle('鞋子图片生成')
    const navigate = useNavigate();

    const uploadUrl = 'https://api.coze.cn/v1/files/upload';
    const patToken = import.meta.env.VITE_PAT_TOKEN;
    const workflowUrl = 'https://api.coze.cn/v1/workflow/run';
    const workflow_id = '7534939677193175080';

    const uploadImageRef = useRef(null)
    const [imgPreviews, setImgPreviews] = useState(['https://res.bearbobo.com/resource/upload/W44yyxvl/upload-ih56twxirei.png']);
    const [selectedColor, setSelectedColor] = useState('红色');
    const [shoeType, setShoeType] = useState('运动鞋');
    const [footType, setFootType] = useState('一双鞋');
    const [style, setStyle] = useState('写实');
    const [description, setDescription] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const [status, setStatus] = useState('');
    const [generatedDescription, setGeneratedDescription] = useState('');

    // 处理多张图片上传
    const handleFileUpload = (e) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        // 如果是首次上传，清空初始预览图
        const newPreviews = imgPreviews.length === 1 && imgPreviews[0].includes('bearbobo.com') ? [] : [...imgPreviews];

        Array.from(files).forEach(file => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (e) => {
                newPreviews.push(e.target?.result);
                setImgPreviews([...newPreviews]);
            };
        });
    }
    const handlePreviewClick = () => {
        uploadImageRef.current.click();
    }
    // 上传单张图片到Coze
    const uploadSingleFile = async (file) => {
        const formData = new FormData();
        formData.append('file', file);

        const res = await fetch(uploadUrl, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${patToken}` },
            body: formData,
        });

        const ret = await res.json();
        if (ret.code !== 0) {
            setStatus(ret.msg);
            return null;
        }
        return ret.data.id;
    }

    // 上传多张图片并获取file_ids
    const uploadFiles = async () => {
        const input = uploadImageRef.current;
        if (!input.files || input.files.length <= 0) return [];

        const fileIds = [];
        for (const file of input.files) {
            const fileId = await uploadSingleFile(file);
            if (fileId) {
                fileIds.push(fileId);
            }
        }
        return fileIds;
    }
    const handleRemoveImage = (index) => {
        // 如果是默认图片，不允许删除
        if (index === 0 && imgPreviews.length === 1 && imgPreviews[0].includes('bearbobo.com')) {
            return;
        }

        const newPreviews = [...imgPreviews];
        newPreviews.splice(index, 1);

        // 如果删除后没有图片，显示默认图片
        if (newPreviews.length === 0) {
            setImgPreviews(['https://res.bearbobo.com/resource/upload/W44yyxvl/upload-ih56twxirei.png']);
        } else {
            setImgPreviews(newPreviews);
        }
    }
    // 生成图片
    const generate = async () => {
        setStatus("图片上传中...");
        const fileIds = await uploadFiles();
        // console.log(fileIds);
        if (fileIds.length === 0) return;

        setStatus("图片上传成功，正在生成...")
        const parameters = {
            // 传递多张图片的file_id
            shoe_pictures: JSON.stringify(fileIds.map(id => ({ file_id: id }))),
            color: selectedColor,
            shoe_type: shoeType,
            foot_type: footType,
            style: style,
            description: description
        };

        const res = await fetch(workflowUrl, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${patToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ workflow_id, parameters }),
        });

        const ret = await res.json();
        console.log(ret);
        if (ret.code !== 0) {
            setStatus(ret.msg);
            return;
        }

        // 解析返回结果
        const data = JSON.parse(ret.data);
        setStatus('');
        setImgUrl(data.image_url);
        setGeneratedDescription(data.description);
    }

    return (
        <div className={styles.container}>
            <div className={styles.backButton}>
                <ArrowLeft fontSize={27} opacity={0.5} onClick={() => navigate(-1)} />
            </div>
            <h1 className={styles.title}>鞋子图片生成器</h1>
            <div className={styles.input}>
                <div className={styles.fileInput}>
                    <input
                        ref={uploadImageRef}
                        type="file"
                        id="image"
                        name="image"
                        accept="image/*"
                        multiple
                        onChange={handleFileUpload}
                    />
                    <p>请上传一张或多张鞋子照片</p>
                </div>

                {/* 图片预览区域 */}
                <div className={styles.previewContainer} onClick={handlePreviewClick}>
                    {imgPreviews.map((preview, index) => (
                        <div key={index} className={styles.previewWrapper}>
                            <img
                                src={preview}
                                alt={`preview-${index}`}
                                className={styles.preview}
                                style={{ cursor: 'pointer' }}
                            />
                            {/* 非默认图片才显示删除按钮 */}
                            {!(index === 0 && imgPreviews.length === 1 && preview.includes('bearbobo.com')) && (
                                <button
                                    className={styles.deleteButton}
                                    onClick={(e) => {
                                        e.stopPropagation(); // 阻止事件冒泡
                                        handleRemoveImage(index);
                                    }}
                                >
                                    ×
                                </button>
                            )}
                        </div>
                    ))}
                </div>

                <div className={styles.settings}>
                    <div className={styles.selection}>
                        <label>鞋子颜色:</label>
                        <select value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)}>
                            <option value="红色">红色</option>
                            <option value="蓝色">蓝色</option>
                            <option value="黑色">黑色</option>
                            <option value="白色">白色</option>
                            <option value="绿色">绿色</option>
                            <option value="黄色">黄色</option>
                        </select>
                    </div>

                    <div className={styles.selection}>
                        <label>鞋子类型:</label>
                        <select value={shoeType} onChange={(e) => setShoeType(e.target.value)}>
                            <option value="运动鞋">运动鞋</option>
                            <option value="休闲鞋">休闲鞋</option>
                            <option value="皮鞋">皮鞋</option>
                            <option value="高跟鞋">高跟鞋</option>
                            <option value="靴子">靴子</option>
                        </select>
                    </div>

                    <div className={styles.selection}>
                        <label>鞋子数量:</label>
                        <select value={footType} onChange={(e) => setFootType(e.target.value)}>
                            <option value="一双鞋">一双鞋</option>
                            <option value="左脚鞋">左脚鞋</option>
                            <option value="右脚鞋">右脚鞋</option>
                        </select>
                    </div>

                    <div className={styles.selection}>
                        <label>风格:</label>
                        <select value={style} onChange={(e) => setStyle(e.target.value)}>
                            <option value="写实">写实</option>
                            <option value="卡通">卡通</option>
                            <option value="国漫">国漫</option>
                            <option value="像素">像素</option>
                            <option value="水彩">水彩</option>
                        </select>
                    </div>

                    <div className={styles.selection}>
                        <label>额外描述:</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="输入额外的描述信息..."
                        />
                    </div>
                </div>

                <div className={styles.generate}>
                    <button className={styles.generateButton} onClick={generate}>生成鞋子图片</button>
                </div>
            </div>

            <div className={styles.output}>
                <h2>生成结果</h2>
                <div className={styles.generated}>
                    {imgUrl ? (
                        <img src={imgUrl} alt="生成的鞋子" />
                    ) : status ? null : (
                        <p>请点击生成按钮开始生成</p>
                    )}
                    {status && <div className={styles.status}>{status}</div>}
                </div>

                {generatedDescription && (
                    <div className={styles.description}>
                        <h3>图片介绍</h3>
                        <p>{generatedDescription}</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Coze
