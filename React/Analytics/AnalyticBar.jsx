import React, { Fragment, useState } from "react";
import { Col, Row, Button } from "react-bootstrap";
import StatAnalyticRightChart from "./StatAnalyticRightChart";
import Flatpickr from "react-flatpickr";
import BottomAnalytics from "./BottomAnalytics";
import analyticService from "services/analyticService";
import toastr from "toastr";

function AnalyticsBar() {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [topSearchResult, setTopSearchResult] = useState({
    user: "",
    uniqVisitors: "",
    bounce: "",
    avgVisit: "",
    pageViews: "",
  });

  const onTopSearchClicked = () => {
    const payload = { ...startDate, ...endDate };
    analyticService
      .getBasicAnalytics(payload)
      .then(onTopSearchSuccess)
      .catch(onTopSearchError);
  };
  const onTopSearchSuccess = (response) => {
    if (response.reports[0].data?.totals[0].values) {
      const totals = response?.reports[0]?.data?.totals[0]?.values;
      setTopSearchResult((prevState) => {
        let getState = { ...prevState };
        getState = {
          user: totals[0],
          uniqVisitors: totals[1],
          bounce: totals[2],
          avgVisit: `${Math.floor(totals[3] / 60)}m`,
        };
        toastr.success("Search SuccessFul");
        return getState;
      });
    } else {
      toastr.error("No data Found");
      return;
    }
  };
  const onTopSearchError = (err) => {
    toastr.error(`Error:${err}`);
  };

  return (
    <Fragment>
      <Row>
        <Col lg={12} md={12} sm={12}>
          <div className="border-bottom pb-4 mb-4 d-md-flex justify-content-between align-items-center">
            <div className="mb-3 mb-md-0 mt-3 mx-3">
              <h1 className="mb-0 h2 fw-bold">Analytics</h1>
            </div>
            <div className="d-flex">
              <div className="input-group me-3 mt-3">
                <Flatpickr
                  placeholder="Start Date"
                  name="startDate"
                  onChange={([formatStartDate]) => {
                    const startDate = formatStartDate
                      .toISOString()
                      .split("T")[0];
                    setStartDate({ startDate });
                  }}
                />
                <span className="input-group-text text-muted" id="basic-addon2">
                  <i className="fe fe-calendar"></i>
                </span>
                <Flatpickr
                  placeholder="End Date"
                  name="endDate"
                  onChange={([formatEndDate]) => {
                    const endDate = formatEndDate.toISOString().split("T")[0];
                    setEndDate({ endDate });
                  }}
                />
                <span className="input-group-text text-muted" id="basic-addon2">
                  <i className="fe fe-calendar"></i>
                </span>
                <Button
                  variant="primary"
                  className="mx-1 rounded"
                  onClick={onTopSearchClicked}
                >
                  Search
                </Button>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col xl={3} lg={6} md={12} sm={12}>
          <StatAnalyticRightChart
            title="USER"
            value={topSearchResult.user}
            classValue="mb-4"
            chartName="UserChart"
          />
        </Col>

        <Col xl={3} lg={6} md={12} sm={12}>
          <StatAnalyticRightChart
            title="UNIQUE VISITORS"
            value={topSearchResult.uniqVisitors}
            classValue="mb-4"
            chartName="VisitorChart"
          />
        </Col>

        <Col xl={3} lg={6} md={12} sm={12}>
          <StatAnalyticRightChart
            title="BOUNCE RATE"
            value={topSearchResult.bounce}
            classValue="mb-4"
            chartName="UserChart"
          />
        </Col>

        <Col xl={3} lg={6} md={12} sm={12}>
          <StatAnalyticRightChart
            title="AVERAGE VISIT TIME"
            value={topSearchResult.avgVisit}
            classValue="mb-4"
            chartName="VisitorChart"
          />
        </Col>
      </Row>
      <BottomAnalytics startDate={startDate} endDate={endDate} />
    </Fragment>
  );
}
export default AnalyticsBar;
