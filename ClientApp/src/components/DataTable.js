import React, { Component } from 'react'
import { Table, Button } from 'reactstrap';
import ModalForm from './Modal';
import axios from 'axios';


class DataTable extends Component {

    deleteItem = id => {
        let confirmDelete = window.confirm('Delete event forever?');

        if (confirmDelete) {
            const url = "https://localhost:5001/api/events/DeleteEventDetails/"+id;

            axios
                .delete(url)
                .then(item => {
                    this.props.deleteEventFromState(id)
                })
                .catch(err => {
                    console.log(err.response);
                });
        };
        }

    render() {

        const currentEvents = this.props.currentEvents.map(event => {
            return (
                <tr key={event.id}>
                    <th scope="row">{event.id}</th>
                    <td>{event.customer}</td>
                    <td>{event.project}</td>
                    <td>{event.type}</td>
                    <td>{event.hours}</td>
                    <td>{event.description}</td>
                    <td>{event.start}</td>
                    <td>{event.end}</td>
                    <td>
                        <div style={{ width: "110px" }}>
                            <ModalForm buttonLabel="Edit" event={event} updateState={this.props.updateState} />
                            {' '}
                            <Button color="danger" onClick={() => this.deleteItem(event.id)}>Del</Button>
                        </div>
                    </td>
                </tr>
            )
        })

        return (
            <Table responsive hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Customer</th>
                        <th>Project</th>
                        <th>Type</th>
                        <th>Hours</th>
                        <th>Description</th>
                        <th>StartDate</th>
                        <th>EndDate</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentEvents}
                </tbody>
            </Table>
        )
    }
}

export default DataTable