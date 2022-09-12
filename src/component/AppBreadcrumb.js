import {Breadcrumb} from "antd";
import {Link} from "react-router-dom";
import {HomeOutlined} from "@ant-design/icons";


export const AppBreadcrumb = (props) => {

    return (
      <Breadcrumb style={{ marginBottom: '10px' }}>
        <Breadcrumb.Item>
          <Link to={'/'}>
            <HomeOutlined />
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <span>{props.name}</span>
        </Breadcrumb.Item>
      </Breadcrumb>
    )
}