import React, { Component } from 'react';

export default class renderField extends Component {

  constructor(props){
    super(props);
  }

  blurred(evt){
    console.log(this.props);
    this.props.parent.updateContent(evt);
  }

    render() {
        const {
          input, label ,type,defaultValue,
          meta: { touched, error, invalid, warning }
        } = this.props;

        if(input.value=="none"){
          return null;
        }
        return (
          <div className={`form-group ${touched && invalid ? 'has-error' : ''}`}>

            <div className="login">

            <input  className={`form-control ${ invalid ? '' : 'has-co'}`} autocomplete="off"  {...input}  type={type}  required/>

            <label className={`${ invalid ? 'input-label' : 'input-email-label_focused'}`}>{label}</label>

          </div>
          <div className="help-block">
          {touched && ((error && <span className='error_color'>{error}</span>) || (warning && <span>{warning}</span>))}
          </div>
        </div>
       );
   }
}
