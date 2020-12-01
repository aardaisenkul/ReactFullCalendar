import React from 'react'
import FullCalendar, { formatDate } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { Container, Row, Col, Modal, ModalHeader, ModalBody } from 'reactstrap'
import DataTable from './components/DataTable'
import { CSVLink } from "react-csv"
import axios from 'axios';
import ModalForm from './components/Modal'
import AddEditForm from './components/FormAddEdit'


export default class DemoApp extends React.Component {


    state = {
        modal: false,
        weekendsVisible: true,
        currentDay: '',
        types: [],
        currentEvents: [],
        
    }

      async getEvents() {
          await axios.get('/api/events')
            .then(response => {
                this.setState({ currentEvents: response.data })
               
                console.log({ calendarEvents: response.data })
            })
            .catch(function (error) {
                console.log(error);
            })

        await axios.get('/api/types')
            .then(response => {
                this.setState({ types: response.data })
                console.log({ types: response.data })
            })
            .catch(function (error) {
                console.log(error);
            })
      }
      

    

    addEventToState = (event) => {


        this.setState(prevState => ({
            currentEvents: [...prevState.currentEvents, event],
           
        }))
        this.getEvents()

    }

    toggle = () => {
        this.setState({ modal: !this.state.modal });
    };

    updateState = (event) => {
        const eventIndex = this.state.currentEvents.findIndex(data => data.id === event.id)
        const newArray = [
            // destructure all items from beginning to the indexed item
            ...this.state.currentEvents.slice(0, eventIndex),
            // add the updated item to the array
            event,
            // add the rest of the items to the array from the index after the replaced item
            ...this.state.currentEvents.slice(eventIndex + 1)
        ]
        this.setState({ currentEvents: newArray })
    }

    deleteItem = id => {
        let confirmDelete = window.confirm('Delete event forever?' + id.event.extendedProps.description);
        console.log(id.event)
        if (confirmDelete) {
            const url = "https://localhost:5001/api/events/DeleteEventDetails/" + id.event.id;

            axios
                .delete(url)
                .then(item => {
                    this.deleteEventFromState(id.event.id)
                })
                .catch(err => {
                    console.log(err.response);
                });
        };
        
    }

    deleteEventFromState = (id) => {
        const updatedEvents = this.state.currentEvents.filter(event => event.id !== id)
        this.setState({ currentEvents: updatedEvents })
        this.getEvents()
    }

    async componentDidMount() {
        this.getEvents()
    }

    render() {
        return ( this.renderCalendar())
    }




renderTahta() {
        return (
            <div>

                <Container className="DemoApp">
                    <Row>
                        <Col>
                            <h1 style={{ margin: "20px 0" }}>Event Database</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <DataTable currentEvents={this.state.currentEvents} updateState={this.updateState} deleteEventFromState={this.deleteEventFromState} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <CSVLink
                                filename={"db.csv"}
                                color="primary"
                                style={{ float: "left", marginRight: "10px" }}
                                className="btn btn-primary"
                                data={this.state.currentEvents}>
                                Download CSV
                            </CSVLink>
                            <ModalForm buttonLabel="Add Event" addEventToState={this.addEventToState} />
                        </Col>
                    </Row>
                </Container>
            </div>



        )
}

    renderCalendar() {
        

        const closeBtn = <button className="close" onClick={this.toggle}>&times;</button>
        return (
            <div className='demo-app'>
                {this.renderSidebar()}
               
                <div className='demo-app-main'>
                    <FullCalendar
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                        headerToolbar={{
                            left: 'prev,next today',
                            center: 'title',
                            right: 'dayGridMonth,timeGridWeek,timeGridDay'
                        }}
                        initialView='dayGridMonth'
                        editable={false}
                        selectable={true}
                        selectMirror={true}
                        dayMaxEvents={true}
                        weekends={this.state.weekendsVisible}
                        /*initialEvents={INITIAL_EVENTS} */ /* alternatively, use the `events` setting to fetch from a feed*/
                        events={this.state.currentEvents}
                        select={this.handleDateSelect}
                        dateClick={(e) => {
                            this.state.currentDay = e.dateStr
                            this.toggle()
                        }}
                        /*
                        eventAdd={this.addEventToState}
                        eventsSet={this.handleEvents}
                        */
                        eventRemove={this.handleEventClick}
                         
                        


                        eventChange={this.handleEvents}
                       

                        eventContent={renderEventContent} /* custom render function */
                        eventClick={this.deleteItem}
                     
                    
                    />
                    <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                        <ModalHeader toggle={this.toggle} close={closeBtn}>Add New Event</ModalHeader>
                        <ModalBody>
                            <AddEditForm
                                
                                addEventToState={this.addEventToState}
                                updateState={this.updateState}
                                toggle={this.toggle}
                                event={this.event}
                                dataFromParent={this.state.currentDay}
                                types={this.state.types} />
                        </ModalBody>
                    </Modal>
                </div>
               
                </div>
             
        )
       

            }
        
    renderSidebar() {
       
        return (
            <div className='demo-app-sidebar'>
                <div className='demo-app-sidebar-section'>
                    <h2>Instructions</h2>
                    <ul>
                        <li>Select dates and you will be prompted to create a new event</li>
                        <li>Click an event to delete it</li>
                    </ul>
                </div>
                <div className='demo-app-sidebar-section'>
                    <label>
                        <input
                            type='checkbox'
                            checked={this.state.weekendsVisible}
                            onChange={this.handleWeekendsToggle}
                        ></input>
                        toggle weekends
          </label>
                </div>
                <div className='demo-app-sidebar-section'>
                    <h2>All Events ({this.state.currentEvents.length})</h2>
                    <ul>
                        {this.state.currentEvents.map(renderSidebarEvent)}
                    </ul>
                </div>
            </div>
        )
    }

    handleWeekendsToggle = () => {
        this.setState({
            weekendsVisible: !this.state.weekendsVisible
        })
    }

    handleDateSelect = (selectInfo) => {
        
        console.log(selectInfo.startStr)
        //let description = prompt('Please enter a new title for your event')
        let calendarApi = selectInfo.view.calendar

        calendarApi.unselect() // clear date selection

        if (false) {
            calendarApi.addEvent({
                start: selectInfo.startStr,
                end: selectInfo.endStr,
                allDay: true
            })
        }
       /* this.addEventToState()*/
    }

  

    
    handleEventClick = (clickInfo) => {
        console.log(clickInfo.event.day)

        if (window.confirm(`Are you sure you want to delete the event '${clickInfo.event.extendedProps.description}'`)) {
            
            clickInfo.event.remove()
        }
    }
   
    handleEvents = (events) => {
        this.setState({
            currentEvents: events
        })
    }
    

}

function renderEventContent(eventInfo) {
    return (
        
        <>
            <i>{eventInfo.event.extendedProps.description}</i>
        </>
    )
}
function renderSidebarEvent(event) {
    
    return (
        <li key={event.id}>
            <b>{formatDate(event.start, { year: 'numeric', month: 'short', day: 'numeric' })}</b>
            <i>{event.description}</i>
        </li>
    )
}


