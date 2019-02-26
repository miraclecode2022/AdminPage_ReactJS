import React, { Component } from 'react';

// khai báo biến mảng
const so = [1,2,3,4,5];

// đây là function ES6. Với x là các phần từ của so đc duyệt từ mảng qua map
// Hàm map giống như for và foreach
const sonhan2 = so.map((x) => x*2+",");
// tương đương với const sonhan2 = so.map(function(x) => x*2+",")


class Test extends Component {
    render() {
      return (
        <div>
          <h2> Các số nhân 2 từ mảng : {sonhan2} </h2>
        </div>
      );
    }
  }
  export default Test
