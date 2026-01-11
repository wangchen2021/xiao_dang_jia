// src/components/FoodListPage.tsx
import React, { useState } from 'react';
import { NotebookContainer, FoodItemCard, UploadCoverBtn } from './styles';

// 定义食物数据类型
interface FoodItem {
    id: number;
    name: string;
    desc: string;
    coverUrl: string;
}

const Index: React.FC = () => {
    // 模拟食物列表数据
    const [foodList, setFoodList] = useState<FoodItem[]>([
        {
            id: 1,
            name: '番茄炒蛋',
            desc: '家常快手菜，酸甜可口',
            coverUrl: 'https://example.com/tomato-egg.jpg' // 替换为实际图片地址
        },
        {
            id: 2,
            name: '可乐鸡翅',
            desc: '软烂脱骨，甜香入味',
            coverUrl: 'https://example.com/coke-wings.jpg'
        }
    ]);

    // 处理封面上传（示例逻辑）
    const handleUploadCover = (foodId: number) => {
        // 实际项目中这里对接文件上传逻辑
        console.log(`上传食物ID ${foodId} 的封面`);
        // 可通过input[type="file"]实现文件选择
    };

    return (
        <NotebookContainer>
            <h2 style={{ margin: 0, color: '#444' }}>我的菜谱</h2>
            <UploadCoverBtn to={'/createFood'} onClick={() => handleUploadCover(0)}>
                添加新菜谱
            </UploadCoverBtn>

            {/* 食物列表 */}
            {foodList.map((food) => (
                <FoodItemCard key={food.id}>
                    <div className="food-cover">
                        <img src={food.coverUrl} alt={food.name} />
                    </div>
                    <div className="food-info">
                        <h3>{food.name}</h3>
                        <p>{food.desc}</p>
                    </div>
                    <button
                        className="action-btn"
                        onClick={() => handleUploadCover(food.id)}
                    >
                        更换封面
                    </button>
                </FoodItemCard>
            ))}
        </NotebookContainer>
    );
};

export default Index;