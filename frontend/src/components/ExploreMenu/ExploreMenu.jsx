import React from "react";
import "./ExploreMenu.css";
import { menu_list } from "../../assets/assets";

const ExploreMenu = ({category,setCategory}) => {
  return (
    <div className="explore-menu" id="explore-menu">
      <h1>Khám phá MENU của chúng tôi!!!</h1>
      <p className="explore-menu-text">
        Thực đơn của chúng tôi được tuyển chọn kỹ lưỡng, từ cà phê đậm đà, trà
        thanh mát đến những món bánh ngọt và đồ ăn nhẹ hấp dẫn. Hãy khám phá và
        chọn món yêu thích của bạn nhé! ☕🍰🥛🍵
      </p>

      <div className="explore-menu-list">
        {menu_list.map((item, index) => {
          return (
            <div onClick={()=>setCategory(prev=>prev===item.menu_name?"All":item.menu_name)} key={index} className="explore-menu-list-item">
              <img className={category===item.menu_name?"active":""} src={item.menu_image} alt="" />
              <p>{item.menu_name}</p>
            </div>
          );
        })}
      </div>
      <hr />
    </div>
  );
};

export default ExploreMenu;
