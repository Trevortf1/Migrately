import React, { Fragment } from "react";
import { Card, ListGroup, Row, ProgressBar } from "react-bootstrap";
import PropTypes from "prop-types";
function SurveyReview(props) {
  const { values, onFinish, onBack, backLabel, onNext } = props;
  const handleSubmit = () => {
    onFinish(props?.formData);
  };

  const handleNextSubmit = () => {
    onNext(values);
  };
  const handleBack = () => {
    onBack(values);
  };
  return (
    <Fragment>
      <ProgressBar animated now={50} label={`${50}%`} />

      <Card className="mt-2">
        <Card.Body>
          <div className="mb-4">
            <h4 className="mb-2 text-decoration-underline">
              Questionnaire Review
            </h4>
            <Card.Text className="fw-bolder">
              Please ensure all the information is correct before submitting.
              <Card.Subtitle className="blockquote-footer card-subtitle h6 mx-3 text-decoration-underlin">
                Disclaimer: This is just to review the information
              </Card.Subtitle>
            </Card.Text>
          </div>
          <div className="mb-4">
            <h4 className="mb-2 text-decoration-underline">
              Questionnaire Details
            </h4>
            <p className="fw-bolder">
              Here are the details to the survey that is about to be created.
              <Card.Subtitle className="blockquote-footer card-subtitle h6 mx-3 text-decoration-underlin">
                Ensure all fields are filled out.
              </Card.Subtitle>
            </p>

            <ListGroup bsPrefix="list-unstyled" as="ul">
              <ListGroup.Item as="li" bsPrefix=" ">
                <strong>- Questionnaire Name</strong>: {props?.formData?.name}
              </ListGroup.Item>
              <ListGroup.Item as="li" bsPrefix=" ">
                {props.formData.surveyTypeId === "1" && (
                  <li>
                    <strong>- Type Survey :</strong> Default{" "}
                  </li>
                )}
                {props.formData.surveyTypeId === "2" && (
                  <li>
                    <strong>- Type Survey :</strong> Draft{" "}
                  </li>
                )}
              </ListGroup.Item>
              <ListGroup.Item as="li" bsPrefix=" ">
                {props.formData.statusId === "1" && (
                  <li>
                    <strong>- Status :</strong> Active{" "}
                  </li>
                )}
                {props.formData.statusId === "2" && (
                  <li>
                    <strong>- Status :</strong> InActive{" "}
                  </li>
                )}
                {props.formData.statusId === "3" && (
                  <li>
                    <strong>- Status :</strong> Pending{" "}
                  </li>
                )}
                {props.formData.statusId === "4" && (
                  <li>
                    <strong>- Status :</strong> Canceled{" "}
                  </li>
                )}
              </ListGroup.Item>
              <ListGroup.Item as="li" bsPrefix=" ">
                {props.formData.entityTypeId === "5" && (
                  <li>
                    <strong>- Type Of Visa :</strong> Immigrant Visa{" "}
                  </li>
                )}
                {props.formData.entityTypeId === "6" && (
                  <li>
                    <strong>- Type Of Visa :</strong> NonImmigrant Visa{" "}
                  </li>
                )}
              </ListGroup.Item>
              <ListGroup.Item as="li" bsPrefix=" ">
                <strong>- VisaId</strong> : {props?.formData?.visaId}
              </ListGroup.Item>
              <ListGroup.Item as="li" bsPrefix=" ">
                <strong>- RequirementId</strong> :{" "}
                {props?.formData?.requirementId}
              </ListGroup.Item>
              <ListGroup.Item as="li" bsPrefix=" ">
                <strong> - Description</strong> : {props?.formData?.description}
              </ListGroup.Item>
            </ListGroup>
          </div>
          <Row md={6} sm={12}>
            <button
              type="button"
              onClick={handleBack}
              className="btn btn-primary"
            >
              {backLabel}
            </button>
          </Row>
          <Row md={6} sm={12}>
            <button
              type="submit"
              onClick={handleSubmit}
              className="btn btn-primary mt-2"
            >
              Submit Questionnaire
            </button>
          </Row>
          <Row md={6} sm={12}>
            <button
              type="submit"
              onClick={handleNextSubmit}
              className="btn btn-primary mt-2"
            >
              Add Questions
            </button>
          </Row>
        </Card.Body>
      </Card>
    </Fragment>
  );
}
SurveyReview.propTypes = {
  formData: PropTypes.shape({
    name: PropTypes.string,
    statusId: PropTypes.string,
    surveyTypeId: PropTypes.string,
    entityTypeId: PropTypes.string,
    visaId: PropTypes.string,
    requirementId: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  onBack: PropTypes.func,
  onNext: PropTypes.func,
  nextLabel: PropTypes.string,
  onFinish: PropTypes.func,
  backLabel: PropTypes.func,
  values: PropTypes.func,
};

export default SurveyReview;
