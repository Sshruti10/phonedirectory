import React, {Component} from 'react';
 
class Main extends Component {

    constructor(props) {
      super(props);
  
      this.state = {};
      this.state.filterText = "Enter data";
      this.state.subscribers = [
        {
          id: 1,
          name: 'Henry',
          phoneNo: '123456'
        },
        {
            id: 2,
            name: 'Daisy',
            phoneNo: '123456'
          }
      ];
  
    }
    handleUserInput(filterText) {
      this.setState({filterText: filterText});
    };
    handleRowDel(subscriber) {
      var index = this.state.subscribers.indexOf(subscriber);
      this.state.subscribers.splice(index, 1);
      this.setState(this.state.subscribers);
    };
  
    handleAddEvent(evt) {
      var id = (+ new Date() + Math.floor(Math.random() * 999999)).toString(36);
      var subscriber = {
        id: id,
        name: "",
        phoneNo: ""
      }
      this.state.subscribers.push(subscriber);
      this.setState(this.state.subscribers);
  
    }
  
    handleSubscriberTable(evt) {
      var item = {
        id: evt.target.id,
        name: evt.target.name,
        value: evt.target.value
      };
  var subscribers = this.state.subscribers.slice();
    var newSubscribers = subscribers.map(function(subscriber) {
  
      for (var key in subscriber) {
        if (key == item.name && subscriber.id == item.id) {
            subscriber[key] = item.value;
  
        }
      }
      return subscriber;
    });
      this.setState({subscribers:newSubscribers});
    };
    
    render() {
  
      return (
        <div>
          <SubscriberTable onSubscriberTableUpdate={this.handleSubscriberTable.bind(this)} onRowAdd={this.handleAddEvent.bind(this)} onRowDel={this.handleRowDel.bind(this)} subscribers={this.state.subscribers} filterText={this.state.filterText}/>
        </div>
      );
  
    }
  
  }
  
  class SubscriberTable extends Component {
  
    render() {
      var onSubscriberTableUpdate = this.props.onSubscriberTableUpdate;
      var rowDel = this.props.onRowDel;
      var filterText = this.props.filterText;
      var subscriber = this.props.subscribers.map(function(subscriber) {
        if (filterText === 'Enter Data') {
          return;
        }
        return (<SubscriberRow onSubscriberTableUpdate={onSubscriberTableUpdate} subscriber={subscriber} onDelEvent={rowDel.bind(this)} key={subscriber.id}/>)
      });
       
      return (
        <div>
        <button type="button" onClick={this.props.onRowAdd} className="btn btn-primary">ADD</button>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th className="border">Name</th>
                <th className="border">Phone No.</th>
                <th className="border"></th>
              </tr>
            </thead>
  
            <tbody>
              {subscriber}
            </tbody>
  
          </table>
        </div>
      );
  
    }
  
  }
  
  class SubscriberRow extends Component {
    onDelEvent() {
      this.props.onDelEvent(this.props.subscriber);
  
    }
    
    render() {
        return (
        <tr className="eachRow">
          <SubsriberDetail onSubscriberTableUpdate={this.props.onSubscriberTableUpdate} cellData={{
            "type": "name",
            value: this.props.subscriber.name,
            id: this.props.subscriber.id,
          }}/>
          <SubsriberDetail onSubscriberTableUpdate={this.props.onSubscriberTableUpdate} cellData={{
            type: "phoneNo",
            value: this.props.subscriber.phoneNo,
            id: this.props.subscriber.id
          }}/>
          <td className="del-cell">
            <input type="button" onClick={this.onDelEvent.bind(this)} value="DELETE" className="del-btn"/>
          </td>
        </tr>
      );
  
    }
  
  }
  
  class SubsriberDetail extends Component {
    render() {
      return (
        <td>
          <input type='text' name={this.props.cellData.type} id={this.props.cellData.id} value={this.props.cellData.value} onChange={this.props.onSubscriberTableUpdate}/>
        </td>
      );
  
    }
  
  }

  
  export default Main;
