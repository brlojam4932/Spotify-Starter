import React from 'react';
import { Link } from "react-router-dom";
import "./Home.css";
import { Tabs } from 'antd';
import { library } from '../helpers/albumList';

const { TabPane } = Tabs;

const Home = () => {

  return (
    <>
      <Tabs defaultActiveKey="1" centered>
        <TabPane tab="FEATURED" key="1">
          <h1 className="featuredTitle">Today Is The Day</h1>
          <div className="albums">
            {library.map((libraries) => (
              <Link to="/album" state={libraries} className="albumSelection">
                <img
                  src={libraries.image}
                  alt="bull"
                  style={{ width: "150px", marginBottom: "10px" }}
                >
                </img>
                <p>{libraries.title}</p>
              </Link>
            ))}
          </div>
        </TabPane>
        <TabPane tab="GENRES" key="2">
          <h1 className="featuredTitle">Top Hits</h1>
          <div className="albums">
            {library.slice(7, 13).map((libraries) => (
              <Link to="/album" state={libraries} className="albumSelection">
                <img
                  src={libraries.image}
                  alt="bull"
                  style={{ width: "150px", marginBottom: "10px" }}
                >
                </img>
                <p>{libraries.title}</p>
              </Link>
            ))}
          </div>
          <h1 className="featuredTitle">Electronic</h1>
          <div className="albums">
            {library.slice(0, 6).map((libraries) => (
              <Link to="/album" state={libraries} className="albumSelection">
                <img
                  src={libraries.image}
                  alt="bull"
                  style={{ width: "150px", marginBottom: "10px" }}
                >
                </img>
                <p>{libraries.title}</p>
              </Link>
            ))}
          </div>
          <h1 className="featuredTitle">Hip Hop</h1>
          <div className="albums">
            {library.slice(2, 8).map((libraries) => (
              <Link to="/album" state={libraries} className="albumSelection">
                <img
                  src={libraries.image}
                  alt="bull"
                  style={{ width: "150px", marginBottom: "10px" }}
                >
                </img>
                <p>{libraries.title}</p>
              </Link>
            ))}
          </div>
          <h1 className="featuredTitle">Classical</h1>
          <div className="albums">
            {library.slice(8, 18).map((libraries) => (
              <Link to="/album" state={libraries} className="albumSelection">
                <img
                  src={libraries.image}
                  alt="bull"
                  style={{ width: "150px", marginBottom: "10px" }}
                >
                </img>
                <p>{libraries.title}</p>
              </Link>
            ))}
          </div>
          <h1 className="featuredTitle">Country</h1>
          <div className="albums">
            {library.slice(9, 16).map((libraries) => (
              <Link to="/album" state={libraries} className="albumSelection">
                <img
                  src={libraries.image}
                  alt="bull"
                  style={{ width: "150px", marginBottom: "10px" }}
                >
                </img>
                <p>{libraries.title}</p>
              </Link>
            ))}
          </div>
        </TabPane>
        <TabPane tab="NEW RELEASES" key="3">
          <h1 className="featuredTitle">Today Is The Day</h1>
          <div className="albums">
            {library.map((libraries) => (
              <Link to="/album" state={libraries} className="albumSelection">
                <img
                  src={libraries.image}
                  alt="bull"
                  style={{ width: "150px", marginBottom: "10px" }}
                >
                </img>
                <p>{libraries.title}</p>
              </Link>
            ))}
          </div>
        </TabPane>
      </Tabs>
    </>
  )
}

export default Home;
