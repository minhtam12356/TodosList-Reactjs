import React from 'react';

import ToDoList from '../Components/Todo';

export default {
  title: 'Example/TodoList',
  component: ToDoList,
  argTypes: {
    backgroundColor: { control: 'color' },
  }
};

const Template = (args) => <ToDoList {...args} />;

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  label: 'Button',
  user: {},
};

export const LoggedOut = Template.bind({});
LoggedOut.args = {};
