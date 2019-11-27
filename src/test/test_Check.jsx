import React from 'react';
/*
import CheckboxTree from 'react-checkbox-tree';

 import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import 'font-awesome/css/font-awesome.min.css';


const nodes = [{
  value: 'mars',
  label: 'Mars',
  children: [
    { value: 'phobos', label: 'Phobos' },
    { value: 'deimos', label: 'Deimos' },
  ],
}];

export default class test_Check extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: [],
      expanded: [],

      seach_Text: "",
    };
  }

  render() {
    const { isLoading, value, results } = this.state;

    return (
      <CheckboxTree nodes={nodes} checked={this.state.checked}
        expanded={this.state.expanded} onCheck={checked => this.setState({ checked })}
        onExpand={expanded => this.setState({ expanded })}
      />


    );
  }
}
 */


export default class test_Check extends React.Component {

  render() {
    let div_Null_Data = {
      minHeight: this.props.w_Height,
      width: this.props.w_Width,
    }
    return (
      <div style={div_Null_Data}>
        <h1> </h1>
      </div>
    );
  }
}