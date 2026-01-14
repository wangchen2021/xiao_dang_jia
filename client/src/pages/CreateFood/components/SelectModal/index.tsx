import React, { useState, useEffect, useCallback, memo } from 'react';
import {
  ModalOverlay,
  SelectContainer,
  SelectHeader,
  SelectTitle,
  SearchWrapper,
  SearchInput,
  SearchIcon,
  SelectContent,
  CardGrid,
  OptionCard,
  CardImage,
  CardName,
  SelectFooter,
  ActionButton,
  AmountConfigWrapper,
  AmountLabel,
  AmountInput,
  SelectedListWrapper,
  SelectedItem,
  RemoveSelectedBtn
} from './styles';
import Select from '@/components/Select';

// 类型定义保持不变
export interface SelectOption {
  id: string | number;
  name: string;
  image: string;
  defaultUnit: string;
  defaultNum: number;
  unitOptions: string[];
  type: 1 | 2 | 3;
}

export interface SelectedOption extends SelectOption {
  num: string;
  unit: string;
}

interface SelectModalProps {
  visible: boolean;
  title: string;
  icon: string;
  color: string;
  options: SelectOption[];
  value: string | null;
  selectedList: SelectedOption[] | null;
  onClose: () => void;
  onConfirm: (selectedList: SelectedOption[] | null) => void;
  placeholder?: string;
}

const SelectModal = memo((props: SelectModalProps) => {
  const {
    visible = false,
    title = '选择内容',
    icon = '📌',
    color = '#e87425',
    options = [],
    selectedList: parentSelectedList,
    onClose,
    onConfirm,
    placeholder = '搜索...'
  } = props;

  const [searchKey, setSearchKey] = useState('');
  const [filteredOptions, setFilteredOptions] = useState<SelectOption[]>(options);
  const [selectedList, setSelectedList] = useState<SelectedOption[]>([]);
  const [editingId, setEditingId] = useState<string | number | null>(null);

  // 初始化
  useEffect(() => {
    if (visible) {
      if (parentSelectedList && parentSelectedList.length > 0) {
        setSelectedList([...parentSelectedList]);
        setEditingId(parentSelectedList[0]?.id || null);
      } else {
        setSelectedList([]);
        setEditingId(null);
      }
      setSearchKey('');
    }
  }, [visible, parentSelectedList]);

  // 搜索
  useEffect(() => {
    if (searchKey.trim()) {
      setFilteredOptions(options.filter(item => 
        item.name.toLowerCase().includes(searchKey.toLowerCase())
      ));
    } else {
      setFilteredOptions([...options]);
    }
  }, [searchKey, options]);

  const handleClose = useCallback(() => {
    setSearchKey('');
    setEditingId(null);
    onClose?.();
  }, [onClose]);

  const handleConfirm = useCallback(() => {
    if (selectedList.length === 0) {
      alert('请至少选择一个材料');
      return;
    }
    const resultList = selectedList.map(item => ({
      name: item.name, img: item.image, type: item.type, num: item.num, unit: item.unit
    }));
    console.log('选择的材料列表：', resultList);
    onConfirm?.(selectedList);
    handleClose();
  }, [selectedList, onConfirm, handleClose]);

  const handleSelect = useCallback((option: SelectOption) => {
    const isExist = selectedList.some(item => item.id === option.id);
    
    if (isExist) {
      setSelectedList(prev => prev.filter(item => item.id !== option.id));
      if (editingId === option.id) {
        const newList = selectedList.filter(item => item.id !== option.id);
        setEditingId(newList.length > 0 ? newList[0].id : null);
      }
    } else {
      const newItem: SelectedOption = {
        ...option, num: option.defaultNum.toString(), unit: option.defaultUnit
      };
      setSelectedList(prev => [...prev, newItem]);
      setEditingId(option.id);
    }
  }, [selectedList, editingId]);

  const handleRemoveSelected = useCallback((id: string | number) => {
    const newList = selectedList.filter(item => item.id !== id);
    setSelectedList(newList);
    if (editingId === id) {
      setEditingId(newList.length > 0 ? newList[0].id : null);
    }
  }, [selectedList, editingId]);

  const handleUpdateNum = useCallback((id: string | number, num: string) => {
    setSelectedList(prev => 
      prev.map(item => item.id === id ? { ...item, num } : item)
    );
  }, []);

  const handleUpdateUnit = useCallback((id: string | number, unit: string) => {
    setSelectedList(prev => 
      prev.map(item => item.id === id ? { ...item, unit } : item)
    );
  }, []);

  const handleOverlayClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  }, [handleClose]);

  const currentEditingItem = selectedList.find(item => item.id === editingId);

  if (!visible) return null;

  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <SelectContainer>
        <SelectHeader>
          <SelectTitle $color={color}>
            <span className="icon">{icon}</span>
            {title}
            {selectedList.length > 0 && (
              <span style={{ 
                fontSize: '14px', marginLeft: '10px', 
                backgroundColor: 'rgba(232, 116, 37, 0.1)',
                padding: '2px 8px', borderRadius: '10px', color
              }}>
                已选{selectedList.length}个
              </span>
            )}
          </SelectTitle>
          <SearchWrapper>
            <SearchIcon>🔍</SearchIcon>
            <SearchInput
              type="text"
              value={searchKey}
              placeholder={placeholder}
              onChange={(e) => setSearchKey(e.target.value)}
            />
          </SearchWrapper>
        </SelectHeader>

        <SelectContent>
          {/* 1. 已选列表 */}
          {selectedList.length > 0 && (
            <SelectedListWrapper>
              <AmountLabel style={{ marginBottom: '10px' }}>已选材料：</AmountLabel>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {selectedList.map(item => (
                  <SelectedItem 
                    key={item.id} 
                    $color={color}
                    onClick={() => setEditingId(item.id)}
                    style={{
                      backgroundColor: editingId === item.id ? `${color}15` : 'transparent', // 浅底色
                      borderColor: editingId === item.id ? color : '#e0e0e0', // 边框变色
                      fontWeight: editingId === item.id ? 'bold' : 'normal', // 文字加粗
                      boxShadow: editingId === item.id ? `0 0 0 2px ${color}33` : 'none', // 发光效果
                      transition: 'all 0.2s ease' // 平滑过渡
                    }}
                  >
                    <span style={{ marginRight: '8px' }}>{item.name}</span>
                    <span style={{ fontSize: '12px', color: '#7a6b5d' }}>
                      （{item.num}{item.unit}）
                    </span>
                    <RemoveSelectedBtn onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveSelected(item.id);
                    }}>
                      ×
                    </RemoveSelectedBtn>
                  </SelectedItem>
                ))}
              </div>
            </SelectedListWrapper>
          )}

          {/* 2. 配置区域 */}
          {currentEditingItem && (
            <AmountConfigWrapper style={{
              // 【辅助修改】：给编辑框也加一个同色系的顶部边框，增强视觉联系
              borderTop: `2px solid ${color}`,
              paddingTop: '15px',
              marginTop: '10px'
            }}>
              <AmountLabel style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {/* 添加一个小的指示器 */}
                <span style={{ 
                  width: '8px', 
                  height: '8px', 
                  borderRadius: '50%', 
                  backgroundColor: color 
                }} />
                正在编辑「{currentEditingItem.name}」：
              </AmountLabel>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginTop: '8px' }}>
                <AmountInput
                  type="number"
                  min="0"
                  step="0.1"
                  value={currentEditingItem.num || ''}
                  placeholder="数量"
                  onChange={(e) => handleUpdateNum(currentEditingItem.id, e.target.value)}
                  style={{ flex: 'none', width: '100px' }}
                />
                <Select
                  value={currentEditingItem.unit}
                  options={currentEditingItem.unitOptions}
                  onChange={(unit) => handleUpdateUnit(currentEditingItem.id, unit)}
                  themeColor={color}
                  width="100px"
                />
              </div>
            </AmountConfigWrapper>
          )}

          {/* 3. 可选列表 */}
          {filteredOptions.length > 0 ? (
            <CardGrid>
              {filteredOptions.map(option => {
                const isSelected = selectedList.some(item => item.id === option.id);
                return (
                  <OptionCard
                    key={option.id}
                    $color={color}
                    className={isSelected ? 'active' : ''}
                    onClick={() => handleSelect(option)}
                  >
                    <CardImage src={option.image} alt={option.name} />
                    <CardName>
                      {option.name}
                      {isSelected && (
                        <span style={{ fontSize: '12px', color: '#6fb27c', marginLeft: '5px' }}>✓</span>
                      )}
                    </CardName>
                  </OptionCard>
                );
              })}
            </CardGrid>
          ) : (
            <div style={{ textAlign: 'center', padding: '50px 0', color: '#7a6b5d' }}>
              <span style={{ fontSize: '40px' }}>😕</span>
              <p>没有找到相关内容</p>
            </div>
          )}
        </SelectContent>

        <SelectFooter>
          <ActionButton className="cancel" onClick={handleClose}>
            取消
          </ActionButton>
          <ActionButton 
            className="confirm" 
            $color={color}
            onClick={handleConfirm}
            disabled={selectedList.length === 0}
          >
            确认选择（{selectedList.length}个）
          </ActionButton>
        </SelectFooter>
      </SelectContainer>
    </ModalOverlay>
  );
});

export default SelectModal;