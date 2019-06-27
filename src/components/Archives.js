import VerticalMenu from './VerticalMenu';
import React, {Component} from 'react'
import { Input, Table, Search, Image, Modal, Form, Select, Icon} from 'semantic-ui-react'
import '../stylesheet_QueueIncidents.css';
import fire from '../config/Fire';
import _ from 'lodash';
import ArchivesDisplay from './ArchivesDisplay';

class Archives extends Component{

    constructor(props){
        super(props);
        this.state = {
            archives: [{}],
            archivesLists: [{}],
            search: ''
        }
        
    }

    componentDidMount(){
        this.getArchives();
    }

    searchUser = (search) => {
        return function(x){
            var name = x.incidentLocation + ' ' + x.incidentID + ' ' + x.incidentTimeReceived + ' ' + x.incidentType;
            return name.toLowerCase().includes(search.toLowerCase()) || !search;
        }
    }

    getArchives = () =>{
        var list = [];
        const archives = fire.database().ref('Archives');
        archives.once('value', snapshot => {
            var archivesList = snapshot.val();
            console.log('archives', archivesList);
            _.map(archivesList, (archive, key) => {
                archive.incidentID = key;
                list.push(archive);
            });
            list.sort(function(a,b){
                return new Date(b.incidentTimeReceived) - new Date(a.incidentTimeReceived);
              });
            this.setState({archives: list}, () => {
                console.log('archiveslist', this.state.archives);
            });
        });

        
    }

    renderAchives = () => {
        return _.map(this.state.archives, (archive, key) => {
            console.log('renderAchives', archive);
            let feedbackLocation, incidentOriginalVolunteer, incidentImage, incidentLocation, feedbackReport, incidentAdditionalResponders, incidentAdditionalVolunteers, incidentMultipleResponders, incidentMultipleVolunteers;
            console.log('arcive shit', archive.incidentCoordinates);
            
            if(!archive.feedbackLocation){
                feedbackLocation = 'No detailed location given by reporter';
            }else{
                feedbackLocation = archive.feedbackLocation;
            }
            if(!archive.feedbackReport){
                feedbackReport = 'No feedback report given by responder';
            }else{
                feedbackReport = archive.feedbackReport;
            }
            if(!archive.incidentOriginalVolunteer){
                incidentOriginalVolunteer = 'No Volunteer requested to respond'
            }else{
                incidentOriginalVolunteer = archive.incidentOriginalVolunteer;
            }
            if(!archive.incidentImage){
                incidentImage = 'No photo of incident uploaded by reporter'
            }else{
                incidentImage = archive.incidentImage
            }
            if(!archive.incidentLocation || archive.incidentLocation === ''){
                incidentLocation = 'Pinned location (See coordinates or Detailed Location)';
            }else{
                incidentLocation = archive.incidentLocation;
            }
            if(!archive.image_uri || archive.image_uri === ''){
                
            }
            if(!incidentAdditionalResponders){
                incidentAdditionalResponders = "No additional responders";
            }else{
                incidentAdditionalResponders = archive.incidentAdditionalResponders;
            }
            if(!incidentAdditionalVolunteers){
                incidentAdditionalVolunteers = "No additional volunteers";
            }else{
                incidentAdditionalVolunteers = archive.incidentAdditionalVolunteers;
            }
            
            return(
            <ArchivesDisplay incidentKey={archive.incidentID} 
                                feedbackByResponder={archive.feedbackByResponder} 
                                feedbackLocation={feedbackLocation} 
                                feedbackReport={feedbackReport}
                                feedbackTimeSettled={archive.feedbackTimeSettled}
                                incidentLocation={incidentLocation} 
                                incidentTimeReceived={archive.incidentTimeReceived}
                                incidentCoordinates={archive.incidentCoordinates}
                                incidentReportedBy={archive.incidentReportedBy}
                                incidentImage={incidentImage} 
                                report={archive.report} 
                                incidentAdditionalResponders={incidentAdditionalResponders} 
                                incidentAdditionalVolunteers={incidentAdditionalVolunteers} 
                                incidentOriginalVolunteer={incidentOriginalVolunteer} 
                                incidentType={archive.incidentType}
                                incidentMultipleResponders={archive.incidentMultipleResponders}
                                incidentAdditionalVolunteers={archive.incidentAdditionalVolunteers}
            />);
        });
    }
    
    searchHandler = (event) => {
        this.setState({search: event.target.value});
    }


    render(){
        return(
            <div>
                <div className="VerticalMenu">
                    <VerticalMenu/>
                </div>
                
                <div className="Archives">
                    
                    <Table celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell colSpan='2'> Archives </Table.HeaderCell>
                                <Table.HeaderCell>
                                    <form style={{paddingLeft:'10px'}}>
                                        <Input type="text" name="" id="" onChange={this.searchHandler} style={{marginLeft:'75px'}}/><Icon name='search' style={{marginLeft:'6px'}}/>    
                                    </form>
                                </Table.HeaderCell>
                            </Table.Row>
                            
                            <Table.Row>
                                <Table.HeaderCell>Incident ID</Table.HeaderCell>
                                <Table.HeaderCell>Incident Location</Table.HeaderCell>
                                <Table.HeaderCell>Time Received</Table.HeaderCell>
                            </Table.Row>

                        </Table.Header>
                            <Table.Body>
                            {this.state.archives.filter(this.searchUser(this.state.search)).map(archive => {
                                console.log('renderAchives', archive.incidentKey);
                                let feedbackLocation, incidentOriginalVolunteer, incidentImage, incidentLocation, feedbackReport;

                                if(!archive.feedbackLocation){
                                    feedbackLocation = 'No detailed location given by reporter';
                                }else{
                                    feedbackLocation = archive.feedbackLocation;
                                }
                                if(!archive.feedbackReport){
                                    feedbackReport = 'No feedback report given by responder';
                                }else{
                                    feedbackReport = archive.feedbackReport;
                                }
                                if(!archive.incidentOriginalVolunteer){
                                    incidentOriginalVolunteer = 'No Volunteer requested to respond'
                                }else{
                                    incidentOriginalVolunteer = archive.incidentOriginalVolunteer;
                                }
                                if(!archive.incidentImage){
                                    incidentImage = 'No photo of incident uploaded by reporter'
                                }else{
                                    incidentImage = archive.incidentImage
                                }
                                if(!archive.incidentLocation || archive.incidentLocation === ''){
                                    incidentLocation = 'Pinned location (See coordinates or Detailed Location)';
                                }else{
                                    incidentLocation = archive.incidentLocation;
                                }
                                return(
                                <ArchivesDisplay incidentKey={archive.incidentID} 
                                                    feedbackByResponder={archive.feedbackByResponder} 
                                                    feedbackLocation={feedbackLocation} 
                                                    feedbackReport={archive.feedbackReport}
                                                    feedbackTimeSettled={archive.feedbackTimeSettled}
                                                    incidentLocation={incidentLocation} 
                                                    incidentTimeReceived={archive.incidentTimeReceived}
                                                    incidentCoordinates={archive.incidentCoordinates}
                                                    incidentReportedBy={archive.incidentReportedBy}
                                                    incidentImage={incidentImage} 
                                                    report={archive.report} 
                                                    incidentAdditionalResponders={archive.incidentAdditionalResponders} 
                                                    incidentAdditionalVolunteers={archive.incidentAdditionalVolunteers} 
                                                    incidentOriginalVolunteer={incidentOriginalVolunteer} 
                                                    incidentType={archive.incidentType}
                                                    incidentMultipleVolunteers={archive.incidentMultipleVolunteers}
                                                    incidentMultipleResponders={archive.incidentAdditionalResponders}
                                        />);
                                })}
                            </Table.Body>
                        </Table>

                    
                </div>
            </div>
        )
    }



}

export default Archives;