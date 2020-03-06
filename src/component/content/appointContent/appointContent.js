import React, { Component } from "react";
import { Row, Col, Table, Button, DatePicker, Tag } from "antd";
import moment from "moment";
import "./appointContent.css";
import axios from "axios";

const columns = [
  {
    title: "Time",
    dataIndex: "time",
    className: "tableSelectTime"
  }
];

const dateFormat = "YYYY/MM/DD";

export class AppointContent extends Component {
         state = {
           consultData: [],
           selectedRowKeys: [],
           dateStr: "",
           listConsult: "",
           dataConsult: [],
           data: [
             {
                key: 1000000,               
                time: "TIme"
             }
           ],
           appoint_id: []
         };

         onSelectChange = selectedRowKeys => {
           this.setState({ selectedRowKeys });
         };
         
         listConsultSave = id => {
           this.setState({ listConsult: id });
           console.log(`listConsult`,this.state.listConsult);
         };

         onChangeDate = (date, dateString) => {
           this.setState({ dateStr: dateString });
           console.log('Date', dateString);
         };

         handleSelect = async () => {
             if (this.state.listConsult.length === 0) {
                 console.log('Missing id');
                 return
             }
             if (this.state.dateStr.length === 0) {
                console.log('Missing date');
                return
             }

            const result = await axios.get("http://localhost:8080/appointPatientRoomTable");

            let time = [];
            let appoint_id = [];
            this.setState({dataConsult: result.data});
           console.log('result.data',result.data);
             result.data.forEach( (obj, idx) => {
                // console.log(obj["consult_id"]);
              //  console.warn('obj["consult_id"]', obj["consult_id"])
              //  console.warn('this.state.listConsult', this.state.listConsult)
              //  console.warn('obj["date"]', obj["date"])
              //  console.warn('this.state.dateStr', this.state.dateStr)
                if(obj["consult_id"] === this.state.listConsult && obj["date"] === this.state.dateStr ) {
                    time.push(obj["time"]);
                    appoint_id.push(result.data[idx].id);
                }
            })
            console.log("time", time);
            console.log("appoint id",appoint_id)
              
            let preDataTime = time.map(data => data.split(','))
            const postTime = preDataTime[0].map(time => ({ time }));
            console.log('postTime', postTime);
                 this.setState(() => ({
                   data: postTime,
                   appoint_id: appoint_id
                 }));
        };

        handleSave = async () => {
            let index = this.state.selectedRowKeys;
            let reserveTime = this.state.data[index].time;
            console.log("Selected Time", reserveTime ,'index', index);
          
            axios
              .post("http://localhost:8080/reserveTime", {
                consult_id: this.state.listConsult,
                time: reserveTime,
                date: this.state.dateStr
              })
              .then(res => {
                console.log("send");
              })
              .catch(err => {
                console.log("error");
                console.error({ message: err.message });
              });
        }


         componentDidMount() {
           axios
             .get("http://localhost:8080/appointPatientRoomList")
             .then(res => {
               this.setState({
                 consultData: res.data
               });
             });
         }
         
         handleTable = (e, two) => {
            console.log(e);
            console.log(two);
         }

         render() {
           const { selectedRowKeys, data } = this.state;
           const rowSelection = {
             selectedRowKeys,
             onChange: this.onSelectChange,
             hideDefaultSelections: false,
             type: "radio"
           };

           return (
             <div>
               <Row>&nbsp;</Row>
               <Row>
                 <Col span={1}></Col>
                 <Col span={3} className="dropMenu">
                   <div className="listConsult">
                     <h3>หัวข้อปรึกษา</h3>
                     <input
                       type="checkbox"
                       name="typeTalk"
                       value="การเรียนรู้"
                     />
                     &nbsp;การเรียนรู้
                     <br />
                     <hr />
                     <input type="checkbox" name="typeTalk" value="ซึมเศร้า" />
                     &nbsp;ซึมเศร้า
                     <br />
                     <hr />
                     <input
                       type="checkbox"
                       name="typeTalk"
                       value="การไปโรงเรียน"
                     />
                     &nbsp;การไปโรงเรียน
                     <br />
                     <hr />
                   </div>
                 </Col>
                 <Col span={1}></Col>
                 <Col span={8} className="listConsult">
                   <div>
                     <h3>กรุณาเลือกผู้ให้คำปรึกษา</h3>
                     <hr />
                     {/* {this.state.consultData.map(list => (
                       <Row>
                         <div
                           onClick={() => this.listConsultSave(list.id)}
                           id="linkConsult"
                         >
                           <Col>Image</Col>
                           <Col>
                             <h4>{list.consult_name}</h4>
                             <p>{list.role}</p>
                             <p>1,500 บาท/ 30 นาที</p>
                             <ul className="listConsult-ul">
                               <li>ซึมเศร้า</li>
                               <li>ปัญหาความเครียด</li>
                             </ul>
                           </Col>
                         </div>
                       </Row>
                     ))} */}
                     <Row className="consult-box">
                       <Col span={5}>
                         <p className="avatar-small"></p>
                       </Col>
                       <Col span={11}>
                         <h4>วิชาย เวนา</h4>
                         <p>จิตแพทย์</p>
                         <p>1,500 บาท/ 30 นาที</p>
                         <div className="listConsult-ul">
                           <Tag color="blue">ซึมเศร้า</Tag>
                           <Tag color="blue">ปัญหาความเครียด</Tag>
                         </div>
                         <br />
                       </Col>
                     </Row>
                     <br />
                     <Row className="consult-box">
                       <Col span={5}>
                         <p className="avatar-small"></p>
                       </Col>
                       <Col span={11}>
                         <h4>รวารตรี เพลานพ</h4>
                         <p>นักจิตวิทยา</p>
                         <p>1,500 บาท/ 30 นาที</p>
                         <div className="listConsult-ul">
                           <Tag color="blue">นอนไม่หลับ</Tag>
                           <Tag color="blue">ปัญหาความเครียด</Tag>
                         </div>
                         <br />
                       </Col>
                     </Row>
                   </div>
                 </Col>
                 <Col span={2}></Col>
                 <Col span={7} className="timeSelect">
                   <h3>กรุณาเลือกวัน และเวลา</h3>
                   <hr />
                   <br />
                   <DatePicker
                     defaultValue={moment("2015/01/01", dateFormat)}
                     onChange={this.onChangeDate}
                     className="dateSelect"
                   />
                   &nbsp;&nbsp;
                   <Button
                     className="btn-Save"
                     onClick={() => this.handleSelect()}
                   >
                     Select
                   </Button>
                   <br />
                   <br />
                   <hr />
                   <Table
                     onChange={this.handleTable}
                     rowSelection={rowSelection}
                     columns={columns}
                     dataSource={data}
                     pagination={false}
                   />
                   <br />
                   <Button
                     className="btn-Save"
                     //  onClick={() => this.handleSave()}
                   >
                     Save
                   </Button>
                   <br />
                   <br />
                 </Col>
               </Row>
             </div>
           );
         }
       }

export default AppointContent;
