import React from 'react';
import { Button, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import axios from 'axios';

class AddEditForm extends React.Component {
    state = {
        id: 0,
        customer: 'Merdol Bey',
        project: 'Ardanın Görüşmesi',
        type: '',
        hours: '',
        start: this.props.dataFromParent,
        end: this.props.dataFromParent,
        description: '',
        allDay : true
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    submitFormAdd = e => {
        e.preventDefault()
        axios({
            method: 'post',
            url: 'https://localhost:5001/api/events/',
            data: {
                customer: this.state.customer,
                project: this.state.project,
                type: this.state.type,
                hours: this.state.hours,
                start: this.state.start,
                end: this.state.end,
                description: this.state.description,
                allDay: true
            }
        })
            .then(event => {
                console.log(this.state)
                console.log(event)
                    this.props.addEventToState(this.state)
                    this.props.toggle()
                })
            .catch(err => console.log(err.response))
    }

    submitFormEdit = e => {
        e.preventDefault()
        axios({
            method: 'put',
            url: 'https://localhost:5001/api/events/',
            data: {
                id: this.state.id,
                customer: this.state.customer,
                project: this.state.project,
                type: this.state.type,
                hours: this.state.hours,
                start: this.state.start,
                end: this.state.end,
                description: this.state.description,
                allDay: true
            }
        })
            .then(event => {
                this.props.updateState(this.state)
                this.props.toggle()
            })
            .catch(err => console.log(err))
    }

    componentDidMount() {
        if (this.props.event) {
            const { id, customer, project, type, hours, start, end, description, allDay } = this.props.event
            this.setState({ id, customer, project, type, hours, start, end, description, allDay })
            
        }
       
    }

    createSelectItems() {
        let items = [];
        let i = 0;
        items.push(<option key="initial" value=" "></option>);
        for (let item in this.props.types) {
          //  console.log(this.props.types[i].name)
            items.push(<option key={item} value={this.props.types[i].name}>{this.props.types[i].name}</option>);
            i++;
            //here I will be creating my options dynamically based on
            //what props are currently passed to the parent component
        }
        return items;
    }

    
    render() {
        
        
       return (
            <Form onSubmit={this.props.event ? this.submitFormEdit : this.submitFormAdd}>
                <Row form>
                    <Col md={5}>
                <FormGroup>
                    <Label for="customer">Customer</Label>
                    <Input type="text" name="customer" id="customer" onChange={this.onChange} value={this.state.customer === null ? '' : this.state.customer} />
                        </FormGroup>
                    </Col>
                    <Col md={5}>
                <FormGroup>
                    <Label for="project">Project</Label>
                    <Input type="text" name="project" id="project" onChange={this.onChange} value={this.state.project === null ? '' : this.state.project} />
                        </FormGroup>
                    </Col>
                </Row>
                <Row form>
                    <Col md={8}>
                <FormGroup>
                            <Label for="type">Type</Label>
                            <Input type="select" name="type" id="type" onChange={this.onChange} value={this.state.type === null ? '' : this.state.type} >
                                {this.createSelectItems()}
                            </Input>         
                        </FormGroup>
                    </Col>
                    <Col md={2}>
                <FormGroup>
                            <Label for="hours">Hours</Label>

                            <Input type="number" name="hours" id="hours" onChange={this.onChange} value={this.state.hours === null ? '' : this.state.hours} />
                            
                        </FormGroup>
                    </Col>
                </Row>
                <Row form>
                <Col md={12}>
                <FormGroup>
                    <Label for="description">Description</Label>
                    <Input type="textarea" name="description" id="description" onChange={this.onChange} value={this.state.description === null ? '' : this.state.description} />
                    </FormGroup>
                    </Col>
                    </Row>
                <FormGroup hidden>
                    <Label for="start">StartDate</Label>
                    <Input type="datetime" name="start" id="start" onChange={this.onChange} value={this.props.dataFromParent} />
                </FormGroup>
                <FormGroup hidden>
                    <Label for="enddate">EndDate</Label>
                    <Input type="datetime" name="end" id="end" onChange={this.onChange} value={this.props.dataFromParent} />
                </FormGroup>
                <Button>Submit</Button>
            </Form>
        );
    }
}

export default AddEditForm