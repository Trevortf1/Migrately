import React, { useState } from "react";
import { Col, Card, Button, Row } from "react-bootstrap";
import ApexCharts from "components/dashboard/analytics/ApexCharts";
import toastr from "toastr";
import PropTypes from "prop-types";
import analyticService from "services/analyticService";
import MapPageView from "./MapPageView";
import MapPageViewData from "./MapPageViewData";
function PageViewPieChart(props) {
  const [pageView, setPageView] = useState({
    arrOfPageView: [],
    arrOfPageViewData: [],
    arrOfPieChartData: [],
    arrOfPieChartLabel: [],
  });
  const onSearchClicked = () => {
    if (!props.dates.data.startDate && !props.dates.data.endDate) {
      toastr.error("No dates selected");
      return;
    } else {
      const payload = {
        ...props.dates.data.startDate,
        ...props.dates.data.endDate,
      };
      analyticService
        .searchPageView(payload)
        .then(onSearchSuccess)
        .catch(onSearchError);
    }
  };
  const onSearchSuccess = (response) => {
    const pageViewType = response?.reports[0]?.data?.rows?.map(
      (row) => row.dimensions
    );
    const pageViewData = response?.reports[0]?.data?.rows?.map(
      (row) => row.metrics
    );
    const pageView = pageViewData?.map((data) => parseInt(data[0].values));
    const pageViewLabelArr = pageViewType?.join(",").split(",");
    const pieChartArr = pageView;
    const pieChartLabel = pageViewLabelArr;
    if (pageViewType && pageViewData) {
      setPageView((prevState) => {
        let ps = { ...prevState };
        ps = {
          arrOfPageView: pageViewLabelArr.map(mapPageView),
          arrOfPageViewData: pageView.map(mapPageData),
          arrOfPieChartData: pieChartArr,
          arrOfPieChartLabel: pieChartLabel,
        };
        toastr.success("Search Successful");
        return ps;
      });
    } else {
      toastr.error("No Data Found.");
    }
  };
  const onSearchError = (err) => {
    toastr.error(err);
  };
  const mapPageView = (pageView, index) => {
    return <MapPageView data={pageView} key={index} />;
  };
  const mapPageData = (pageData, index) => {
    return <MapPageViewData data={pageData} key={index} />;
  };
  return (
    <Col xl={6} lg={6} md={6} className="mb-4">
      <Card className="h-100">
        <Card.Header className="align-items-center card-header-height d-flex justify-content-between align-items-center">
          <h4 className="mb-0">Page Traffic</h4>
        </Card.Header>
        <Card.Body className="p-1">
          <ApexCharts
            options={{
              labels:
                pageView.arrOfPieChartLabel.length > 0
                  ? pageView.arrOfPieChartLabel
                  : ".",
            }}
            series={
              pageView.arrOfPieChartData.length > 0
                ? pageView.arrOfPieChartData
                : [1]
            }
            type="donut"
            height={260}
          />
        </Card.Body>
        <hr />
        <Row className="d-flex justify-content-around">
          <Col xl={3} lg={3} md={3} className="mx-2">
            {pageView.arrOfPageView}
          </Col>

          <Col xl={8} lg={8} md={8}>
            {pageView.arrOfPageViewData}
          </Col>
        </Row>

        <Card.Footer className="d-flex justify-content-around">
          <Button className="btn btn-primary px-9" onClick={onSearchClicked}>
            Search
          </Button>
        </Card.Footer>
      </Card>
    </Col>
  );
}
PageViewPieChart.propTypes = {
  dates: PropTypes.shape({
    data: PropTypes.string,
  }).isRequired,
};
export default PageViewPieChart;
