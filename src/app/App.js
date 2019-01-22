import React from "react";
import BigCalendar from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import uuidv1 from "uuid/v1";

import savedEvents from "./events";

const localizer = BigCalendar.momentLocalizer(moment);

class App extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = { events: savedEvents };
  }

  handleSelect = ({ start, end }) => {
    const title = window.prompt("New Event name");

    if (title)
      this.setState({
        events: [
          ...this.state.events,
          {
            id: uuidv1(),
            start,
            end,
            title
          }
        ]
      });
  };

  render() {
    const { events } = this.state;
    return (
      <BigCalendar
        selectable
        step={10}
        timeslots={8}
        defaultView={BigCalendar.Views.WEEK}
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        onSelectSlot={this.handleSelect}
        style={{ height: "90vhh" }}
      />
    );
  }
}

export default App;
