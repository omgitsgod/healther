import React from "react"

class RecordContainer extends React.Component {
  render(){
    let records
    if(this.props.UserRecords){
      records=this.props.UserRecords.map((Record)=>{
        <RecordCard key={Record.id} record={Record}/>
      })
    }
    return
      <div className="RecordContainer">

      </div>
  }
}

export default RecordContainer
