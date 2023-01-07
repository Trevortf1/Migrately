import React, { useState, Fragment } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import analyticService from "services/analyticService";
import PieChart from "./PieChart";
import toastr from "toastr";
import AnalyticFormSearchSchema from "schemas/analayticFormSearchSchema";
import DimensionPieChart from "./DimensionPieChart";
function AnalyticFormSearch(dates) {
  const [data, setData] = useState({ metric: "", dimension: "" });
  const handleSubmit = (values) => {
    const payload = {
      ...dates.data.endDate,
      ...dates.data.startDate,
      ...values,
    };
    if (dates.data.startDate && dates.data.endDate) {
      analyticService
        .searchAnalyitcs(payload)
        .then(onAnalyticSearchSuccess)
        .catch(onAnalyticSearchError);
    } else {
      toastr.error("Please Pick Dates");
      return;
    }
  };

  const onAnalyticSearchSuccess = (response) => {
    const arrOfDimensionData = response?.reports[0]?.data?.rows?.map(
      (row) => row.metrics
    );
    const reportData = response?.reports[0]?.data;
    const reportColumn = response?.reports[0]?.columnHeader;

    if (arrOfDimensionData) {
      setData((prevState) => {
        let ps = { ...prevState };
        ps = {
          metricType: reportColumn?.metricHeader?.metricHeaderEntries,
          metricResult: reportData?.totals[0]?.values,
          dimensionType: reportColumn?.dimensions,
          dimensionResult: reportData?.rows?.map((row) => row.dimensions),
          dimensionData: arrOfDimensionData?.map((data) =>
            parseInt(data[0].values)
          ),
        };
        toastr.success("Search SuccessFul");
        return ps;
      });
    } else {
      toastr.error("No Data Found");
      return;
    }
  };

  const onAnalyticSearchError = (err) => {
    toastr.error(`Error: ${err}`);
  };

  return (
    <Fragment>
      <Row>
        <PieChart data={data} />
        <DimensionPieChart data={data} />
        <Col xl={4} lg={4} md={4} className="mb-4">
          <Card className="h-100 ">
            <Formik
              enableReinitialize={true}
              initialValues={data}
              validationSchema={AnalyticFormSearchSchema}
              onSubmit={handleSubmit}
            >
              <Form>
                <Card.Header className="align-items-center card-header-height d-flex justify-content-between align-items-center">
                  <h4 className="mb-0">Search</h4>
                </Card.Header>
                <Card.Body>
                  <Row className="m-3 mx-10">
                    <label>Metric</label>
                    <Field
                      component="select"
                      name="metric"
                      className="form-check"
                      multiple={true}
                    >
                      <option value="users">User</option>
                      <option value="hits">Hits</option>
                      <option value="entrances">Entrances</option>
                      <option value="exitRate">Exit Rate</option>
                      <option value="exits">Exits</option>
                    </Field>
                    <ErrorMessage
                      name="metric"
                      component="option"
                      className="text-danger"
                    />
                  </Row>
                  <Row className="m-3 mx-10">
                    <label>Dimensions</label>
                    <Field
                      component="select"
                      name="dimension"
                      className="form-check"
                      multiple={true}
                    >
                      <option value="pagePath">PagePath</option>
                      <option value="continent">Continent</option>
                      <option value="country">Country</option>
                      <option value="region">Region</option>
                      <option value="city">City</option>
                      <option value="browser">Browser</option>
                    </Field>
                    <ErrorMessage
                      name="dimension"
                      component="option"
                      className="text-danger"
                    />
                  </Row>
                  <Row>
                    <Button
                      variant="primary"
                      className="mx-1 rounded mt-8"
                      type="submit"
                    >
                      Search
                    </Button>
                  </Row>
                </Card.Body>
              </Form>
            </Formik>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
}
export default AnalyticFormSearch;
