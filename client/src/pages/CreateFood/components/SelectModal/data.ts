// src/pages/CreateFood/PrepareStep/SelectModal/data.ts

import { CDN } from "@/constant";

// 器材数据（type=1）
export const equipmentOptions = [
    {
        id: 1,
        name: '炒锅',
        image: 'https://img1.baidu.com/it/u=123456,7890&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
        defaultUnit: '个', // 默认选中的单位
        defaultNum: 1, // 默认数量
        unitOptions: ['个', '套', '台'], // 可选单位列表
        type: 1 // 1=设备
    },
    {
        id: 3,
        name: '菜刀',
        image: 'https://img0.baidu.com/it/u=123456,7890&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
        defaultUnit: '把',
        defaultNum: 1,
        unitOptions: ['把', '套'],
        type: 1
    },
    {
        id: 4,
        name: '砧板',
        image: 'https://img3.baidu.com/it/u=123456,7890&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
        defaultUnit: '块',
        defaultNum: 1,
        unitOptions: ['块', '个'],
        type: 1
    },
];

// 食材数据（type=2）
export const ingredientOptions = [
    {
        id: 1,
        name: '五花肉',
        image: CDN + '/public/icons/pork_belly.svg',
        defaultUnit: 'g',
        defaultNum: 1,
        unitOptions: ['g', 'kg', '斤', '两'],
        type: 2 // 2=食材
    },
    {
        id: 2,
        name: '土豆',
        image: CDN + '/public/icons/potato.svg',
        defaultUnit: '个',
        defaultNum: 1,
        unitOptions: ['个', 'g', 'kg', '斤'],
        type: 2
    },
    {
        id: 4,
        name: '鸡蛋',
        image: CDN + '/public/icons/egg.svg',
        defaultUnit: '个',
        defaultNum: 1,
        unitOptions: ['个', '斤', '打'],
        type: 2
    },
    {
        id: 5,
        name: '西红柿',
        image: CDN + '/public/icons/tomato.svg',
        defaultUnit: '个',
        defaultNum: 1,
        unitOptions: ['个', '斤', 'g'],
        type: 2
    },
];

// 调味料数据（type=3）
export const seasoningOptions = [
    {
        id: 1,
        name: '盐',
        image: 'https://img1.baidu.com/it/u=123456,7890&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
        defaultUnit: '小勺',
        defaultNum: 1,
        unitOptions: ['小勺', '大勺', 'g', '克'],
        type: 3 // 3=调味料
    },
    {
        id: 2,
        name: '生抽',
        image: 'https://img3.baidu.com/it/u=123456,7890&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
        defaultUnit: '勺',
        defaultNum: 1,
        unitOptions: ['勺', '小勺', '大勺', 'ml', '升'],
        type: 3
    },
    {
        id: 3,
        name: '料酒',
        image: 'https://img0.baidu.com/it/u=123456,7890&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
        defaultUnit: 'ml',
        defaultNum: 1,
        unitOptions: ['ml', '升', '勺', '大勺'],
        type: 3
    },
    {
        id: 4,
        name: '白糖',
        image: 'https://img2.baidu.com/it/u=123456,7890&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
        defaultUnit: '小勺',
        defaultNum: 1,
        unitOptions: ['小勺', '大勺', 'g', 'kg', '斤'],
        type: 3
    },
    {
        id: 5,
        name: '食用油',
        image: 'https://img1.baidu.com/it/u=123456,7890&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
        defaultUnit: 'ml',
        defaultNum: 1,
        unitOptions: ['ml', '升', '勺', '大勺'],
        type: 3
    },
];