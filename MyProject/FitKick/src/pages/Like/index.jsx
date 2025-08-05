import { useLikeStore } from '@/store/useLikeStore';
import styles from './like.module.css';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from '@react-vant/icons';
import { useState, useRef } from 'react';
import { useToastStore } from '@/store/useToastStore'; // 导入toast提示
import eventBus, { EVENT_TYPES } from '@/utils/eventBus';
import { useEffect } from 'react';

const Like = () => {
    const {
        products,
        selectedItems,
        toggleSelect,
        removeLikeProduct,
        removeSelectedProducts,
        getSelectedCount,
        getSelectedTotalPrice
    } = useLikeStore();
    const navigate = useNavigate();
    const { showToast } = useToastStore(); // 获取toast提示方法
    const [swipedProductId, setSwipedProductId] = useState(null);
    const startXRef = useRef(0);

    // 添加结算处理函数
    const handleCheckout = () => {
        // 获取选中的商品数量
        const selectedCount = getSelectedCount();
        // 获取总价
        const totalPrice = getSelectedTotalPrice();
        // 显示结算成功提示
        showToast({
            message: `成功结算${selectedCount}件商品,总价${totalPrice}元`,
            type: 'success',
        });

        // 延迟删除选中的商品，让用户看到提示
        setTimeout(() => {
            removeSelectedProducts();
        }, 1000);
    };

    // 商品点击处理函数
    const handleProductClick = (product) => {
        // 直接使用product.id
        navigate(`/detail/${product.id}`, {
            state: { clickedImageUrl: product.image }
        });
    };

    // 触摸开始处理函数
    const handleTouchStart = (e, productId) => {
        startXRef.current = e.touches[0].clientX;
    };

    // 触摸移动处理函数
    const handleTouchMove = (e, productId) => {
        const currentX = e.touches[0].clientX;
        const diff = currentX - startXRef.current;
        if (diff < -50) setSwipedProductId(productId);
        else if (diff > 60) setSwipedProductId(null);
    };

    // 触摸结束处理函数
    const handleTouchEnd = () => {
        setTimeout(() => setSwipedProductId(null), 3000);
    };

    // 全选/取消全选
    const toggleSelectAll = () => {
        const allSelected = products.every(p => selectedItems[p.id]);
        const newSelected = {}
        products.forEach(p => newSelected[p.id] = !allSelected);
        products.forEach(p => toggleSelect(p.id));
    };

    // 组件挂载时使用事件总线重置徽章
    useEffect(() => {
        eventBus.emit(EVENT_TYPES.RESET_BADGE);
    }, []);

    return (
        <>
            <div className={styles.likeContainer}>
                <div className={styles.header}>
                    <div className={styles.title}>
                        <ArrowLeft fontSize={27} opacity={0.5} onClick={() => navigate(-1)} />
                        <h2>我喜欢的</h2>
                    </div>
                    <div className={styles.filterButtons}>
                        <button className={styles.active}>全部</button>
                        <button onClick={() => navigate('/coze')}>AI生成想要的鞋子样式</button>
                    </div>
                </div>

                {/* 只有当有喜欢的商品时才显示全选框 */}
                {products.length > 0 && (
                    <div className={styles.selectAllContainer}>
                        <input
                            type="checkbox"
                            checked={products.every(p => selectedItems[p.id]) && products.length > 0}
                            onChange={(e) => {
                                e.stopPropagation(); // 阻止事件冒泡
                                toggleSelectAll();
                            }}
                        />
                        <span>全选</span>
                    </div>
                )}

                <div className={styles.productList}>
                    {products.map(product => (
                        <div
                            key={product.id}
                            className={styles.productCard}
                            onTouchStart={(e) => handleTouchStart(e, product.id)}
                            onTouchMove={(e) => handleTouchMove(e, product.id)}
                            onTouchEnd={handleTouchEnd}
                            onClick={() => handleProductClick(product)}
                            style={{ cursor: 'pointer' }}
                        >
                            <div className={styles.checkboxContainer}>
                                <input
                                    type="checkbox"
                                    checked={selectedItems[product.id] || false}
                                    onClick={(e) => e.stopPropagation()}
                                    onChange={(e) => {
                                        e.stopPropagation();
                                        toggleSelect(product.id);
                                    }}
                                />
                            </div>
                            <img src={product.image} alt={product.name} className={styles.productImage} />
                            <div className={styles.productInfo}>
                                <h3 className={styles.productName}>{product.name}</h3>
                                <div className={styles.productDetails}>
                                    <span className={styles.productSize}>{product.size}</span>
                                </div>
                                <div className={styles.productPrice}>
                                    <span className={styles.currentPrice}>¥{product.price}</span>
                                </div>
                            </div>
                            {swipedProductId === product.id && (
                                <div
                                    className={styles.unlikeButton}
                                    onClick={(e) => {
                                        e.stopPropagation(); // 防止触发商品点击事件
                                        removeLikeProduct(product.id);
                                    }}
                                >
                                    取消喜欢
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* 添加新的结算按钮，实现条件显示 */}
                {getSelectedCount() > 0 && (
                    <button
                        className={styles.checkoutButton}
                        onClick={handleCheckout}
                    >
                        结算 ({getSelectedTotalPrice()}元)
                    </button>
                )}
            </div>
        </>
    );
};

export default Like;
