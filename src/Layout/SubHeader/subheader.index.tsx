import { Col, Menu, Row } from "antd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "Store";
import { ISubNavData } from "Layout/redux/types";
import style from "./subheader.module.css";

//Status : Incomplete
//Reason : The main heading will be fetched from Redux.
//         Nav links will also be fetched from Redux. It will be an object array.

function SubHeader() {
  const navigate = useNavigate();
  const subNavaData = useSelector(
    (state: RootState) => state.LayoutReducer.subNavData
  );
  const activeKeyReducer = useSelector(
    (state: RootState) => state.LayoutReducer.activeKey
  );
  
  return (
    <div className={style["mainSubHeaderDiv"]}>
      <Row>
        <Col span={6}>
        </Col>

        <Col span={12}>
          <Menu
            mode="horizontal"
            className={style["AntdNavbarMenu"]}
            selectedKeys={[activeKeyReducer]}
          >
            {subNavaData.map((obj: ISubNavData, index: number) => {
              return (
                <Menu.Item
                  onClick={() => {
                    navigate(obj.path);
                  }}
                  key={obj.name}
                  style={{color: obj.name !== activeKeyReducer ? "rgb(122 121 121)" : "initial"}}
                >
                  {obj.name}
                </Menu.Item>
              );
            })}
          </Menu>
        </Col>
        <Col span={6}></Col>
      </Row>
    </div>
  );
}

export default SubHeader;
