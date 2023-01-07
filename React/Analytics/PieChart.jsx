import React from "react";
import { Col, Card, Row } from "react-bootstrap";
import ApexCharts from "components/dashboard/analytics/ApexCharts";
import PropTypes from "prop-types";

function PieChart(props) {
  const mapMetricType = (type, index) => {
    return (
      <Col xl={12} lg={12} md={12}>
        <strong>
          <p key={index}>Result: {type}</p>
        </strong>
      </Col>
    );
  };
  const mapMetricData = (data, index) => {
    return (
      <Col xl={12} lg={12} md={12}>
        <strong>
          <p key={index}>Metric: {data.name}</p>
        </strong>
      </Col>
    );
  };

  return (
    <Col xl={4} lg={4} md={4} className="mb-4">
      <Card className="h-100">
        <Card.Header className="align-items-center card-header-height d-flex justify-content-between align-items-center">
          <h4 className="mb-0">Metric Results</h4>
        </Card.Header>
        <Card.Body className="p-1">
          <ApexCharts
            options={{
              labels: props.data?.metricType
                ? props.data?.metricType?.map((type) => type.name)
                : ".",
            }}
            series={
              props.data?.metricResult
                ? props.data?.metricResult?.map((metric) => parseInt(metric))
                : [1]
            }
            type="donut"
            height={260}
          />
        </Card.Body>
        <hr />
        <Row className="d-flex justify-content-around">
          <Col xl={3} lg={3} md={3} className="mx-2">
            {props.data?.metricType?.map(mapMetricData)}
          </Col>

          <Col xl={8} lg={8} md={8}>
            {props.data?.metricResult?.map(mapMetricType)}
          </Col>
        </Row>
      </Card>
    </Col>
  );
}
PieChart.propTypes = {
  data: PropTypes.shape({
    metricResult: PropTypes.number,
    metricType: PropTypes.string,
    dimensionType: PropTypes.string,
    dimensionResult: PropTypes.number,
  }).isRequired,
};
export default PieChart;
