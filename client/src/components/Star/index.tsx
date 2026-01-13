import React, { memo, useCallback, useState } from 'react'
import styled from 'styled-components'

export type scoreType = 0 | 1 | 2 | 3 | 4 | 5

interface StarProps {
    value: scoreType,
    onChange?: (value: scoreType) => void
}

const StarItem = styled.span`
  color: #fadb14;
  font-size: 24px;
  margin-right: 0;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.1);
    filter: brightness(1.1);
  }
`

const Star: React.FC<StarProps> = memo(({ value, onChange }) => {
    const [score, setScore] = useState(value)
    const changeScore = (newValue: scoreType) => {
        setScore(newValue)
        onChange && onChange(newValue)
    }
    const createStar = useCallback((value: scoreType) => {
        const stars = []
        for (let i = 1; i <= 5; i++) {
            stars.push(<StarItem onClick={() => changeScore(i as scoreType)} key={i}>{i <= (value || 0) ? '★' : '☆'}</StarItem>)
        }
        return stars
    }, [value])
    return (
        <>
            {createStar(score)}
        </>
    )
})

export default Star