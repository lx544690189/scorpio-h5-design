import React from 'react';
import { Card, Empty, Drawer, Row, Col } from 'antd';
import './index.less';
import { useModel } from 'umi';
import Model from '../../../model';

export default function() {
  const { page, closeCreatePageDrawer, openConfigPageDrawer, onCreatePage } = useModel('page');
  const { queryPageListReq } = Model.useContainer();
  const templateList = queryPageListReq.data;

  const useTemplate = function(template:any){
    onCreatePage({
      ...template.pageSchema[0],
    });
  };

  return (
    <Drawer
      className="page-add"
      title="新增页面-选择页面模板"
      placement="left"
      onClose={closeCreatePageDrawer}
      visible={page.createModalVisible}
      getContainer={false}
      style={{ position: 'absolute' }}
      width={430}
    >
      <Row gutter={16}>
        <Col
          className="gutter-row"
          span={12}
          onClick={()=>{
            // onCreatePage(pageSchema);
            openConfigPageDrawer();
          }}
        >
          <Card
            className="page-add-card"
            cover={
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description=""/>
            }
          >
            <div className="title">空白页面</div>
          </Card>
        </Col>
        {
          templateList && templateList.list.map((template: any) => (
            <Col className="gutter-row" span={12} key={template._id}>
              <Card
                className="page-add-card"
                cover={
                  <img
                    className="page-add-card-img"
                    alt="example"
                    src={template.pageSchema[0].cover}
                  />
                }
                onClick={()=>{useTemplate(template);}}
              >
                <div className="title">{template.pageSchema[0].config.title}</div>
              </Card>
            </Col>
          ))
        }
      </Row>
    </Drawer>
  );
}
