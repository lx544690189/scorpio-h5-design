import React, { useEffect, useState } from 'react';
import './index.less';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd';
import classnames from 'classnames';
import Coupon1 from '@src/h5/coupon/coupon-1';
import Coupon2 from '@src/h5/coupon/coupon-2';
import { useModel } from 'umi';
import DynamicComponent from '../DynamicComponent';

const reorder = (list: any, startIndex: any, endIndex: any) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export default function() {
  const [components1, setComponents] = useState([
    {
      name: 'coupon-style-1',
      component: Coupon1,
    },
    {
      name: 'coupon-style-2',
      component: Coupon2,
    },
  ]);

  const onDragEnd = function(result: DropResult) {
    console.log('result: ', result);
    if (!result.destination) {
      return;
    }
    setComponents(
      reorder(components1, result.source.index, result.destination.index) as any
    );
  };
  const { isDraging, onDragEnter, onDragLeave, onDrop, onSelectComponent, pageSchema, selectPageIndex, dragingComponentIndex, onSortEnd } = useModel('mobile');
  let components:any[] = [];
  if (pageSchema.length > 0 && selectPageIndex !== -1) {
    components = pageSchema[selectPageIndex].components;
  }
  console.log('components: ', components);

  return (
    <DragDropContext onDragEnd={(result: DropResult)=>{onSortEnd(result, components);}}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {components.length > 0 && components.map((item: any, index: any) => (
              <Draggable key={item.uuid} draggableId={item.uuid} index={index}>
                {(provided, snapshot) => (
                  <>
                    <div
                      className={classnames(
                        'h5-canvas-empty-block',
                        { show: isDraging, over: dragingComponentIndex === index }
                      )}
                      onDragEnter={(event) => { onDragEnter(event, index); }}
                      onDragLeave={(event) => { onDragLeave(event); }}
                      onDragOver={(event) => { event.preventDefault(); }}
                      onDrop={(event)=>{onDrop(event, index);}}
                    />
                    <div
                      className={classnames('h5-canvas-block', { 'isDragging': snapshot.isDragging })}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      onClick={() => { onSelectComponent(item, index); }}
                    >
                      <DynamicComponent id={item._id}/>
                    </div>
                  </>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
            <div
              className={classnames(
                'h5-canvas-empty-block',
                { show: isDraging, over: dragingComponentIndex === components.length }
              )}
              onDragEnter={(event) => { onDragEnter(event, components.length); }}
              onDragLeave={(event) => { onDragLeave(event); }}
              onDragOver={(event) => { event.preventDefault(); }}
              onDrop={(event)=>{onDrop(event, components.length);}}
            />
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
