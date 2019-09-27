import React, { Component } from 'react';
import { Card } from 'antd';
import 'antd/lib/card/style/css';
import '../stylesheets/App.css';

const { Meta } = Card;

class CardComponent extends Component {
  constructor(props){
    super(props);
  }
  render(){
      const cardStyle = {
        textAlign: 'center'
      };
      const headStyle = {
        textAlign: 'center',
        fontSize: '30px',
        fontStyle: 'italic',
        fontFamily: 'monospace'
      }
    const gridStyle = {
      textAlign: 'left',
      height: '530px'
    };
    const imgStyle = {
        maxHeight: '160px',
        objectFit: 'cover'
    }
    const metaStyle = {
        paddingTop: '5px',
        paddingBottom: '5px'
    }
    const paddingTop = {
        paddingTop: '3px'
    }
    return (
      <div>
        <h1 style={headStyle}>Top six ice-cream parlors in your town</h1>
      <Card style={cardStyle}>
      {this.props.cardLists.map( item => (
      <Card.Grid style={gridStyle} key={item.id}>
      <Card
        hoverable
        cover={<img alt={item.name} src={item.imageUrl} style={imgStyle}/>}
      >
      <Meta style={metaStyle} title={item.name} description={`${item.street},${item.city}`} />
    </Card>
    <h3 style={paddingTop}>TOP REVIEWS</h3>
    <p>$<b>{item.review[0].userName}</b> says "${item.review[0].text}"</p>
    <p>$<b>{item.review[1].userName}</b> says "${item.review[1].text}"</p>
    <p>$<b>{item.review[2].userName}</b> says "${item.review[2].text}"</p>
    </Card.Grid>
  ))}
  </Card>
  </div>
  );
  }
}

export default CardComponent;