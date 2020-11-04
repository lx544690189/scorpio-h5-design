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

// fake data generator
const getItems = (count: any) =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-${k}`,
    content: `item ${k}`,
  }));

// a little function to help us with reordering the result
const reorder = (list: any, startIndex: any, endIndex: any) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getItemStyle = (isDragging: any, draggableStyle: any) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? 'lightgreen' : 'grey',

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = (isDraggingOver: any) => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  padding: grid,
  width: 250,
});

export default function() {
  const [items, setItems] = useState<{ id: string; content: string }[]>(
    getItems(10)
  );
  const [components, setComponents] = useState([
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
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    setComponents(
      reorder(components, result.source.index, result.destination.index) as any
    );
  };
  const { dragAction, onDragEnter, onDragLeave, onDrop } = useModel('drag');

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
          // style={getListStyle(snapshot.isDraggingOver)}
          >
            {components.map((item, index) => (
              <Draggable key={item.name} draggableId={item.name} index={index}>
                {(provided, snapshot) => (
                  <>
                    <div
                      className={classnames(
                        'h5-canvas-empty-block',
                        { show: dragAction.isDraging, over: dragAction.index === index}
                      )}
                      onDragEnter={(event)=>{onDragEnter(event, index);}}
                      onDragLeave={(event)=>{onDragLeave(event, index);}}
                      onDragOver={(event)=>{event.preventDefault();}}
                      onDrop={onDrop}
                    />
                    <div
                      className={classnames('h5-canvas-block', { 'isDragging': snapshot.isDragging })}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    // style={getItemStyle(
                    //   snapshot.isDragging,
                    //   provided.draggableProps.style
                    // )}
                    >
                      <item.component />
                    </div>
                  </>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
            <div
              className={classnames(
                'h5-canvas-empty-block',
                { show: dragAction.isDraging, over: dragAction.index === components.length }
              )}
              onDragEnter={(event)=>{onDragEnter(event, components.length);}}
              onDragLeave={(event)=>{onDragLeave(event, components.length);}}
              onDragOver={(event)=>{event.preventDefault();}}
              onDrop={onDrop}
            />
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
