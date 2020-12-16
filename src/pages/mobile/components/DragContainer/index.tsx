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

export default function() {
  const { isDraging, onDragEnter, onDragLeave, onDrop, onSelectComponent, pageSchema,
    selectPageIndex, dragingComponentIndex, onSortEnd, selectComponentId } = useModel('mobile');
  let components:any[] = [];
  if (pageSchema.length > 0 && selectPageIndex !== -1) {
    components = pageSchema[selectPageIndex].components;
  }

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
                        {
                          show: isDraging,
                          over: dragingComponentIndex === index,
                        }
                      )}
                      onDragEnter={(event) => { onDragEnter(event, index); }}
                      onDragLeave={(event) => { onDragLeave(event); }}
                      onDragOver={(event) => { event.preventDefault(); }}
                      onDrop={(event)=>{onDrop(event, index);}}
                    />
                    <div
                      className={classnames(
                        'h5-canvas-block',
                        {
                          'isDragging': snapshot.isDragging,
                          'isSelected': selectComponentId === item.uuid,
                        }
                      )}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      onClick={() => { onSelectComponent(item.uuid); }}
                    >
                      <DynamicComponent id={item._id} componentProps={item.props} containerProps={item.containerProps}/>
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
