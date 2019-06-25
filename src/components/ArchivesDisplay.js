import React, {Component} from 'react';
import { Button, Table, Header, Image, Modal, Form} from 'semantic-ui-react'
import '../stylesheet_QueueIncidents.css';
import '../HeaderDashboard.css';
import _ from 'lodash';

class ArchivesDispaly extends Component{

    constructor(props){
        super(props);
        this.state = {
            days: '',
            hours: '',
            minutes: '',
            seconds: ''
        }
    }
    
    displayImage = () => {
        if(this.props.incidentImage !== 'No photo of incident uploaded by reporter'){
            return(
                <div style={{marginTop:'15px', marginBottom:'15px', paddingBottom:'15px', fontSize:'1em', fontFamily:'monospace,monospace'}}>
                    <p><b>PHOTO OF INCIDENT </b></p>
                    <p><Image style={{paddingLeft:'35px'}} src={this.props.incidentImage} size='large'/></p>
                </div>
                );
        }else{
            return (
                <pre style={{marginTop:'15px',  paddingBottom:'15px', fontSize:'1em', fontFamily:'monospace,monospace'}}>
                    <b>PHOTO OF INCIDENT: </b>
                    <u>  {this.props.incidentImage}  </u>
                </pre>
                );
        }
    }

    computeTotalResponseTime = (date2, date1) => {
        var res = Math.abs(date1 - date2) / 1000;
        var days = Math.floor(res / 86400);                      
        var hours = Math.floor(res / 3600) % 24;        
        var minutes = Math.floor(res / 60) % 60;
        var seconds = res % 60;
        var time = {
            days, hours, minutes, seconds
        }
        return time;
    }

    render(){
        var {days, hours, minutes, seconds} = this.computeTotalResponseTime(new Date(this.props.feedbackTimeSettled), new Date(this.props.incidentTimeReceived));

        return(
            <Table.Row>
                <Table.Cell width='4'>
                    <Header as='h4' image>
                        <Header.Content>
                            <Modal trigger={<a positive>{this.props.incidentKey}</a>} closeIcon size='large' >
                        
                            <Modal.Content style={{backgroundColor:'white'}}>
                            
                                <div style={{fontSize:'40px', color:'#16426a', textAlign:'center'}}>
                                    <b>INCIDENT REPORT</b>
                                </div>
                                <div style={{marginBottom:'0px', marginTop:'-13px', paddingBottom:'45px', textAlign:'center', fontSize:'16px', color:'#16426a'}}>
                                    <b>{this.props.incidentKey}</b>
                                </div>
                                
                                <Form>
                                    <div style={{fontSize:'16px', paddingBottom:'5px', fontSize:'1em', fontFamily:'monospace,monospace',  paddingBottom:'15px'}}>
                                        <Form.Group widths='2'>
                                            <Form.Field>
                                                <pre style={{marginBottom:'0px', marginTop:'5px'}}>
                                                    <b>REPORTED BY  : </b>           
                                                    <u>  {this.props.incidentReportedBy}  </u>
                                                </pre>
                                            </Form.Field>
                                            <Form.Field>
                                                <pre style={{marginBottom:'0px', marginTop:'5px'}}>
                                                    <b>DATE OF REPORT : </b>     
                                                    <u>  {this.props.incidentTimeReceived}  </u>   
                                                </pre>
                                            </Form.Field>
                                        </Form.Group>
                                        <Form.Group widths='2'>
                                            <Form.Field>
                                                <pre style={{marginBottom:'0px', marginTop:'-13px'}}>
                                                    <b>RESPONDED BY : </b> 
                                                    <u>  {this.props.feedbackByResponder}  </u>
                                                </pre>
                                            </Form.Field>
                                            <Form.Field>
                                                <pre style={{marginBottom:'0px', marginTop:'-13px'}}>
                                                    <b>VOLUNTEERED BY : </b> 
                                                    <u>  {this.props.incidentOriginalVolunteer}  </u>
                                                </pre>
                                            </Form.Field>
                                        </Form.Group>
                                    </div>

                                    <div style={{textAlign:'center', backgroundColor:'#16426a', padding:'5px', color:'white', fontSize:'18px'}}>
                                        <b>INCIDENT INFORMATION</b>
                                    </div>

                                    <div style={{paddingBottom:'5px', fontSize:'1em', fontFamily:'monospace,monospace'}}>
                                        <Form.Group widths='2'>
                                            <Form.Field>
                                                <pre style={{marginBottom:'0px'}}>
                                                    <b>TYPE OF INCIDENT  : </b> 
                                                    <u>  {this.props.incidentType}  </u>
                                                </pre>
                                            </Form.Field>
                                            <Form.Field>
                                                <pre style={{marginBottom:'0px'}}>
                                                    <b>SETTLED DATE        : </b> 
                                                    <u>  {this.props.feedbackTimeSettled}  </u>
                                                </pre>
                                            </Form.Field>
                                        </Form.Group>

                                        <Form.Group widths='2'>
                                            <Form.Field>
                                                <pre style={{marginBottom:'5px', marginTop:'-13px'}}>
                                                    <b>INCIDENT LOCATION : </b> 
                                                    <u>&nbsp;&nbsp;{this.props.incidentLocation}&nbsp;&nbsp;</u>
                                                </pre>
                                            </Form.Field>
                                            <Form.Field>
                                                <pre style={{marginBottom:'5px', marginTop:'-13px'}}>
                                                    <b>TOTAL RESPONSE TIME : </b> 
                                                    <u>{days} day/s: {hours} hour/s: {minutes} minute/s: {seconds} second/s</u>
                                                </pre>
                                            </Form.Field>
                                        </Form.Group>
                                          
                                        <pre style={{marginBottom:'5px', marginTop:'-13px'}}>
                                            <b>DETAILED LOCATION : </b> 
                                            <u>  {this.props.feedbackLocation}  </u>
                                        </pre>
                                        <pre style={{marginBottom:'15px', marginTop:'5px'}}>
                                            <b>      COORDINATES : </b>
                                            {_.map(this.props.incidentCoordinates, (coordinates) => {
                                                console.log('inmapcoordinates', coordinates);
                                                return(
                                                    <u>  {coordinates}  </u>
                                                );
                                            })}
                                        </pre>

                                        <div style={{marginBottom:'15px', marginTop:'5px'}}>
                                            <b>INCIDENT DESCRIPTION</b> 
                                            <div style={{backgroundColor:'#94a7b9', padding:'30px'}}>
                                                {this.props.feedbackReport}
                                            </div>
                                        </div>
                                        
                                        <div style={{marginBottom:'5px', marginTop:'5px'}}>
                                            <b>ADDITIONAL</b> 
                                        </div>
                                        
                                        {this.props.incidentAdditionalResponders === ''?
                                            <pre style={{marginBottom:'5px', marginTop:'5px'}}>
                                                <b>    RESPONDERS : </b> <u>  No Additional Responders Requested  </u>
                                            </pre>
                                            :
                                            <pre style={{marginBottom:'15px', marginTop:'5px'}}>
                                                <b>    RESPONDERS</b> {
                                                    _.map(this.props.incidentAdditionalResponders, (additionalResponder) => {
                                                    return(
                                                        <div>
                                                            <div>
                                                                <b>      Name          : </b> <u>  {additionalResponder.name}  </u>
                                                            </div>
                                                            <div>
                                                                <b>      Time Received : </b> <u>  {additionalResponder.timeReceived}  </u>
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </pre>
                                            }
                                            
                                        {this.props.incidentAdditionalVolunteers === ''?
                                            <pre style={{marginBottom:'5px', marginTop:'5px'}}>
                                                <b>    VOLUNTEERS : </b> <u>  No Additional Volunteers Requested   </u>
                                            </pre>
                                            :
                                            <pre style={{marginBottom:'15px', marginTop:'5px'}}>
                                                <b>    VOLUNTEERS</b> {
                                                    _.map(this.props.incidentAdditionalVolunteers, (additionalVolunteer) => {
                                                    return(
                                                        <div>
                                                            <div>
                                                                <b>      Name          : </b> <u>  {additionalVolunteer.name}  </u>
                                                            </div>
                                                            <div>
                                                                <b>      Time Received : </b> <u>  {additionalVolunteer.timeReceived}  </u>
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </pre>
                                            }
                                    </div>

                                    <div>{this.displayImage()}</div>
                                
                                    <div style={{backgroundColor:'#16426a', padding:'15px'}}></div>       

                                </Form>
                        </Modal.Content>
                    </Modal>
                        </Header.Content>
                    </Header>
                </Table.Cell>
                <Table.Cell width='3'>
                    <Header.Content>
                    {this.props.incidentLocation}
                    </Header.Content>
                </Table.Cell>
                <Table.Cell width='3'>
                    <Header.Content>
                        {this.props.incidentTimeReceived}
                    </Header.Content>
                </Table.Cell>
                
                
            </Table.Row>
        )
    }



}

export default ArchivesDispaly;