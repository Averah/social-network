import React from "react";

export class ProfileStatus extends React.Component {
  state = {
    editMode: false,
    status: this.props.status,
  };
 
  activateEditMode = () => {
    this.setState({
      editMode: true,
      
    });
    
  }

  deactivateEditMode = () => {
    this.setState({
      editMode: false,
    });
    this.props.updateUsersStatus(this.state.status)
  }

  onStatusChange = (e) => {
    this.setState({
      status: e.currentTarget.value
    })
  }
  
  componentDidUpdate (prevProps, prevState) {
    if (prevProps.status !== this.props.status)
    this.setState({
      status: this.props.status
    })
  }

  render() {
    const editMode = this.state.editMode;
    return (
      <div>
        {editMode ? (
          <div>
            <input
            onChange={this.onStatusChange}
              onBlur={this.deactivateEditMode}
              autoFocus={true}
              value={this.state.status}
            />
          </div>
        ) : (
          <div>
            <span onDoubleClick={this.activateEditMode}>
              {this.props.status || 'Status'}
            </span>
          </div>
        )}
      </div>
    );
  }
}
