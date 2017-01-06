import React from 'react';
import ReactDOM from 'react-dom';

class Tabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selected: 0 };
  }

  click(idx) {
    event.preventDefault();
    this.setState({ selected: idx });
  }

  render() {
    return (
      <div className="tabs-widget">
        <ul className="tab-header">
          {
            this.props.tabs.map((tab, idx) => {
              return (
                <li key={idx}
                    className={(idx === this.state.selected ? "active" : "" )}
                    onClick={this.click.bind(this, idx)}>
                  <p>{tab.title}</p>
                </li>
              );
            })
          }
        </ul>
        <article className="tab-content">
          <p>{this.props.tabs[this.state.selected].content}</p>
        </article>
      </div>
    );
  }
}

export default Tabs;
