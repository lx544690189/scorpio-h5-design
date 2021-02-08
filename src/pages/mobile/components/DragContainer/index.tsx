import React from 'react';
import './index.less';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd';
import classnames from 'classnames';
import { useModel } from 'umi';
import DynamicComponent from '../DynamicComponent';
import { useBoolean } from 'ahooks';

export default function() {
  const [isOrdering, setIsOrdering] = useBoolean(false);
  const {
    isDraging, pageSchema, selectPageIndex, dragingComponentIndex, selectComponentId,
    onDragEnter, onDragLeave, onDrop, onSelectComponent, onSortEnd,
  } = useModel('bridge');
  let components:any[] = [];
  if (pageSchema.length > 0 && selectPageIndex !== -1) {
    components = pageSchema[selectPageIndex].components;
  }

  return (
    <DragDropContext
      onDragStart={()=>{
        setIsOrdering.setTrue();
      }}
      onDragEnd={(result: DropResult)=>{
        onSortEnd(result, components);
        setIsOrdering.setFalse();
      }}
    >
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
                        {
                          show: isDraging,
                          over: dragingComponentIndex === index,
                        }
                      )}
                      onDragEnter={() => { onDragEnter(index); }}
                      onDragLeave={() => { onDragLeave(); }}
                      onDragOver={(event) => { event.preventDefault(); }}
                      onDrop={(event)=>{onDrop(event, index);}}
                    />
                    <div
                      className={classnames(
                        'h5-canvas-block',
                        {
                          'blur': !snapshot.isDragging && isOrdering,
                          'isSelected': selectComponentId === item.uuid,
                        }
                      )}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      onClick={() => { onSelectComponent(item); }}
                    >
                      <DynamicComponent
                        id={item._id}
                        uuid={item.uuid}
                        isSelected={selectComponentId === item.uuid}
                        componentProps={item.props}
                        containerProps={item.containerProps}
                      />
                    </div>
                  </>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
            <div
              className={classnames(
                'h5-canvas-empty-block',
                {
                  show: isDraging,
                  over: dragingComponentIndex === components.length,
                }
              )}
              onDragEnter={() => { onDragEnter(components.length); }}
              onDragLeave={() => { onDragLeave(); }}
              onDragOver={(event) => { event.preventDefault(); }}
              onDrop={(event)=>{onDrop(event, components.length);}}
            />
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
