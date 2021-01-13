import React from 'react'
import styled from 'styled-components'
import { GridList } from '@material-ui/core'

const calendar = [
  '29',
  '30',
  '10月1日',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
  '21',
  '22',
  '23',
  '24',
  '25',
  '26',
  '27',
  '28',
  '29',
  '30',
  '31',
  '11月1日',
  '2'
]

const Month = () => {
  return (
    <Container>
      <SCGridList cols={7} spacing={0} cellHeight='auto'>
        {calendar.map(c => (
          <li>
            <Element>{c}</Element>
          </li>
        ))}
      </SCGridList>
    </Container>
  )
}
export default Month

const Container = styled.div`
  height: 90vh;
`
const SCGridList = styled(GridList)`
  border-left: 1px solid #ccc;
  border-top: 1px solid #ccc;
`
const Element = styled.div`
  border-right: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  height: 18vh;
`