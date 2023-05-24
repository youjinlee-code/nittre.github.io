import React, {FunctionComponent, ReactNode} from 'react'
import styled from '@emotion/styled'
import {Link} from 'gatsby'

export type CategoryListProps = {
    selectedCategory: string,
    categoryList: {
        [key: string]: number
    }
}

const CategoryListWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    width:750px;
    margin: 3em auto 0;

    @media (max-width: 768px) {
        width: 100%;
        padding: 0 20px;
    }
`

const CategoryItem = styled(({ active, ...props }: GatsbyLinkProps) => (
    <Link {...props} />
  ))<CategoryItemProps>`
    margin-right: 20px;
    padding: 5px 0;
    font-weight: ${({ active }) => (active ? '800' : '400')};
    color: ${({active}) => (active ? '#6AB767' : 'rgb(52, 58, 64)')};
    cursor: pointer;
  
    &:last-of-type {
      margin-right: 0;
    }

    &:hover {
        text-decoration: underline;
        color: #6AB767;

    }
  `

type CategoryItemProps = {
    active: boolean;
  }
  
type GatsbyLinkProps = {
    children: ReactNode;
    className?: string;
    to: string;
} & CategoryItemProps

const CategoryList: FunctionComponent<CategoryListProps> = function({
    selectedCategory, categoryList
}) {
    return (
        <CategoryListWrapper>
            {Object.entries(categoryList).map(([name, count]) => (
                <CategoryItem 
                    to={`/?category=${name}`} 
                    active={name === selectedCategory} 
                    key={name}>
                        #{name}({count})
                </CategoryItem>
            ))}
        </CategoryListWrapper>
    )
}

export default CategoryList