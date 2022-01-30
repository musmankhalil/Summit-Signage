import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import Scheduler from 'react-big-scheduler';
import withDragDropContext from 'with-dnd-context';
import 'react-big-scheduler/lib/css/style.css';
import moment from 'moment';
import { confirmAlert } from 'react-confirm-alert';

class SchedulerView extends Component{
        constructor(props){
        super(props);
         let SchedulerData=this.props.SchedulerData;
        let today = moment().format(this.props.DATE_FORMAT);
        let schedulerData = new SchedulerData(today, this.props.ViewTypes.Day,false,false);
        schedulerData.localeMoment.locale('en');
        schedulerData.setResources(this.props.DemoData.resources);
        schedulerData.setEvents(this.props.DemoData.events);
        this.state = {
            viewModel: schedulerData
        }
       
       this.confirmAddNewEvent = this.confirmAddNewEvent.bind(this);
    }

confirmAddNewEvent(scheduleDetails){
      console.log('New schedule item', scheduleDetails);  
        
      confirmAlert({
        title: 'Add New Event ?',                      
        message: `Would you like to add new schedule item on : ${scheduleDetails.slotName} , with start time- ${scheduleDetails.start}?`, 
        childrenElement: () => <div></div>,       
        confirmLabel: 'YES',                           
        cancelLabel: "CANCEL",                             
        onConfirm: () => { this.props.showNewScheduleEvent(scheduleDetails)},    
        onCancel: () => {},      
      });
}



    render(){
        const {viewModel} = this.state;
        return (
            <div>

                <div>
                     <Scheduler schedulerData={viewModel}
                               prevClick={this.prevClick}
                               nextClick={this.nextClick}
                               onSelectDate={this.onSelectDate}
                               onViewChange={this.onViewChange}
                               eventItemClick={this.eventClicked}
                               viewEventClick={this.ops1}
                               viewEventText="Ops 1"
                               viewEvent2Text="Ops 2"
                               viewEvent2Click={this.ops2}
                               updateEventStart={this.updateEventStart}
                               updateEventEnd={this.updateEventEnd}
                               moveEvent={this.moveEvent}
                               newEvent={this.newEvent}
                               toggleExpandFunc={this.toggleExpandFunc}
                    />
                    
                </div>
            </div>
        )
    }

    prevClick = (schedulerData)=> {
        schedulerData.prev();
        schedulerData.setEvents(this.props.DemoData.events);
        this.setState({
            viewModel: schedulerData
        })
    }

    nextClick = (schedulerData)=> {
        schedulerData.next();
        schedulerData.setEvents(this.props.DemoData.events);
        this.setState({
            viewModel: schedulerData
        })
    }

    onViewChange = (schedulerData, view) => {
        schedulerData.setViewType(view.viewType, view.showAgenda, view.isEventPerspective);
        schedulerData.setEvents(this.props.DemoData.events);
        this.setState({
            viewModel: schedulerData
        })
    }

    onSelectDate = (schedulerData, date) => {
        schedulerData.setDate(date);
        schedulerData.setEvents(this.props.DemoData.events);
        this.setState({
            viewModel: schedulerData
        })
    }

    eventClicked = (schedulerData, event) => {
        this.props.showNewScheduleEvent(event);
    };

    ops1 = (schedulerData, event) => {
        alert(`You just executed ops1 to event: {id: ${event.id}, title: ${event.title}}`);
    };

    ops2 = (schedulerData, event) => {
        alert(`You just executed ops2 to event: {id: ${event.id}, title: ${event.title}}`);
    };

    newEvent = (schedulerData, slotId, slotName, start, end, type, item) => {
        let scheduleDtl = {
            schedule:schedulerData,
            slotId:slotId,
            slotName:slotName,
            start:start,
            end:end,
            type:type,
            item:item
        }
        this.confirmAddNewEvent(scheduleDtl);
        
    }

    updateEventStart = (schedulerData, event, newStart) => {
        if(confirm(`Do you want to adjust the start of the event? {eventId: ${event.id}, eventTitle: ${event.title}, newStart: ${newStart}}`)) {
            schedulerData.updateEventStart(event, newStart);
        }
        this.setState({
            viewModel: schedulerData
        })
    }

    updateEventEnd = (schedulerData, event, newEnd) => {
        if(confirm(`Do you want to adjust the end of the event? {eventId: ${event.id}, eventTitle: ${event.title}, newEnd: ${newEnd}}`)) {
            schedulerData.updateEventEnd(event, newEnd);
        }
        this.setState({
            viewModel: schedulerData
        })
    }

    moveEvent = (schedulerData, event, slotId, slotName, start, end) => {
        if(confirm(`Do you want to move the event? {eventId: ${event.id}, eventTitle: ${event.title}, newSlotId: ${slotId}, newSlotName: ${slotName}, newStart: ${start}, newEnd: ${end}`)) {
            schedulerData.moveEvent(event, slotId, slotName, start, end);
            this.setState({
                viewModel: schedulerData
            })
        }
    }

    addResource = (resourceName) => {
        let schedulerData = this.state.viewModel;
        let newFreshId = schedulerData.resources.length + 1;
        let newFreshName = resourceName;
        schedulerData.addResource({id: newFreshId, name: newFreshName});
        this.setState({
            viewModel: schedulerData
        })
    }

    toggleExpandFunc = (schedulerData, slotId) => {
        schedulerData.toggleExpandStatus(slotId);
        this.setState({
            viewModel: schedulerData
        });
    }
}


export default withDragDropContext(SchedulerView)