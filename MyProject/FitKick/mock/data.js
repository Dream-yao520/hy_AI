import Mock from 'mockjs';

// 每页10
const getImages = (tab = '推荐', page, pageSize = 10) => {
    return Array.from({ length: pageSize }, (_, i) => ({
        // 用于索引唯一
        id: `${tab}-${page}-${Date.now()}-${i}`,
        height: Mock.Random.integer(100, 1000),
        url: Mock.Random.image('300x400', Mock.Random.color(), '#fff', 'img')
    }))
}

export default [{
    url: '/api/search',
    method: 'get',
    timeout: 1000,
    response: (req, res) => {
        // ?keyword=释小龙
        const keyword = req.query.keyword;
        let num = Math.floor(Math.random() * 10);
        let list = [];
        for (let i = 0; i < num; i++) {
            // 随机内容
            const randomData = Mock.mock({
                title: '@ctitle'
            })
            // console.log(randomData)
            list.push(`${randomData.title}${keyword}`)
        }

        return {
            code: 0,
            data: list
        }
    }
},
{
    url: '/api/hotlist',
    method: 'get',
    timeout: 1000,
    response: (req, res) => {
        return {
            code: 0,
            data: [{
                id: '101',
                name: "Nike Alphafly 3"
            }, {
                id: '102',
                name: "飞电3 Elite"
            }, {
                id: '103',
                name: "Asics Gel-Kayano 14"
            },
            {
                id: '104',
                name: "李宁 韦德之道10「晨曦」"
            },
            {
                id: '105',
                name: "鸿星尔克 奇弹4.0"
            },
            {
                id: '106',
                name: "安踏 x 雪碧联名「冰爽绿」"
            },
            {
                id: '107',
                name: "李宁 x 成龙联名「功夫鞋」"
            },
            {
                id: '108',
                name: "特步 260X"
            },
            {
                id: '109',
                name: "Travis Scott x Nike Air Max 1 \"Baroque Brown\""
            },
            {
                id: '110',
                name: "Jacquemus x Nike Air Humara"
            },
            ]
        }
    }
},
{
    url: '/api/detail/:id',
    method: 'get',
    timeout: 1000,
    response: (req, res) => {
        // 获取商品ID
        const id = req.query.id;

        // 商品相关词汇库
        const productTypes = ['运动鞋', '跑步鞋', '篮球鞋', '训练鞋', '休闲鞋'];
        const features = ['轻量', '透气', '减震', '耐磨', '支撑', '防滑', '舒适', '时尚'];
        const colors = ['黑色', '白色', '灰色', '蓝色', '红色', '绿色', '黄色', '紫色'];
        const brands = ['Nike', 'Adidas', '李宁', '安踏', '特步', 'Asics', 'New Balance'];

        // 从hotlist中查找对应ID的商品，如果存在则使用其名称
        const hotlist = [{
            id: '101',
            name: "Nike Alphafly 3"
        }, {
            id: '102',
            name: "飞电3 Elite"
        }, {
            id: '103',
            name: "Asics Gel-Kayano 14"
        },
        { id: '104', name: "李宁 韦德之道10「晨曦」" },
        { id: '105', name: "鸿星尔克 奇弹4.0" },
        { id: '106', name: "安踏 x 雪碧联名「冰爽绿」" },
        { id: '107', name: "李宁 x 成龙联名「功夫鞋」" },
        { id: '108', name: "特步 260X" },
        { id: '109', name: "Travis Scott x Nike Air Max 1 \"Baroque Brown\"" },
        { id: '110', name: "Jacquemus x Nike Air Humara" }
        ];

        const matchedProduct = hotlist.find(item => item.id === id);
        let title;

        if (matchedProduct) {
            // 如果找到匹配的商品，使用其名称
            title = matchedProduct.name;
        } else {
            // 否则生成相关的商品标题
            const brand = Mock.Random.pick(brands);
            const feature = Mock.Random.pick(features);
            const productType = Mock.Random.pick(productTypes);
            const color = Mock.Random.pick(colors);

            title = `${brand} ${feature} ${color} ${productType}`;
        }

        // 生成相关的商品描述
        const feature1 = Mock.Random.pick(features);
        const feature2 = Mock.Random.pick(features.filter(f => f !== feature1));
        const feature3 = Mock.Random.pick(features.filter(f => f !== feature1 && f !== feature2));

        const desc = `这款${title.toLowerCase()}采用了${feature1}设计，配合${feature2}技术，提供出色的${feature3}性能。适合各种运动场景，穿着舒适，耐用性强。`;

        const randomData = Mock.mock({
            title: title,
            price: '@integer(100, 300)',
            desc: desc,
            images: [
                {
                    url: 'https://img.36krcdn.com/hsossms/20250729/v2_17dc4793268c46558e68355c5b25a55d@000000@ai_oswg369871oswg1536oswg722_img_000~tplv-1marlgjv7f-ai-v3:600:400:600:400:q70.jpg?x-oss-process=image/format,webp',
                    alt: title
                },
                {
                    url: 'https://img.36krcdn.com/hsossms/20250729/v2_17dc4793268c46558e68355c5b25a55d@000000@ai_oswg369871oswg1536oswg722_img_000~tplv-1marlgjv7f-ai-v3:600:400:600:400:q70.jpg?x-oss-process=image/format,webp',
                    alt: title
                },
                {
                    url: 'https://img.36krcdn.com/hsossms/20250729/v2_17dc4793268c46558e68355c5b25a55d@000000@ai_oswg369871oswg1536oswg722_img_000~tplv-1marlgjv7f-ai-v3:600:400:600:400:q70.jpg?x-oss-process=image/format,webp',
                    alt: title
                },
            ]
        })

        return {
            code: 0,
            data: randomData
        }
    }
},
{
    // ?page=1 queryString
    url: '/api/images',
    method: 'get',
    response: ({ query }) => {
        const page = Number(query.page) || 1;
        const tab = query.tab || '推荐';
        return {
            code: 0,
            data: getImages(tab, page)
        }
    }
}
]