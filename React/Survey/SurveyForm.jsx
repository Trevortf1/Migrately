import React, { Fragment, useEffect, useState } from "react";
import { ErrorMessage, Field, withFormik } from "formik";
import { Card, Form, Row, Col, ProgressBar } from "react-bootstrap";
import PropTypes from "prop-types";
import addSurveySchema from "schemas/addSurveySchema";
import * as nivcService from "../../services/nivcService";
import debug from "sabio-debug";
import * as ivcsService from "../../services/immigrantVisaCategoriesService";
import surveyService from "services/surveyService";
function SurveyForm(props) {
  const { values, isSubmitting, nextLabel, onNext } = props;

  const _logger = debug.extend("SurveyForm");
  const handleSubmit = () => {
    onNext(values);
  };
  const [immigrantCategories, setimmigrantCategories] = useState({
    arrOfImmigrantCat: [],
  });
  const [surveyRequirements, setSurveyRequirements] = useState({
    arrofRequirements: [],
  });
  useEffect(() => {
    if (values.entityTypeId === "5") {
      ivcsService
        .GetAllCategoriesImmigrantVisa()
        .then(onGetAllImmigrantCategoriesSuccess)
        .catch(onGetAllImmigrantCategoriesError);
    } else if (values.entityTypeId === "6") {
      nivcService
        .GetAllCategories()
        .then(onGetAllNonImmigrantCategoriesSuccess)
        .catch(onGetAllNonImmigrantCategoriesError);
    }
    if (surveyRequirements.arrofRequirements.length <= 0) {
      surveyService
        .getAllSurveyRequirments()
        .then(onGetAllSurveyRequirmentsSuccess)
        .catch(onGetAllSurveyRequirmentsError);
    }
  }, [values.entityTypeId]);
  const onGetAllNonImmigrantCategoriesSuccess = (response) => {
    setimmigrantCategories((prevState) => {
      let ps = { ...prevState };
      ps.arrOfImmigrantCat = response.data.items.map(mapNonImmigrantCategories);
      return ps;
    });
  };
  const onGetAllNonImmigrantCategoriesError = (err) => {
    _logger(err);
  };
  const onGetAllImmigrantCategoriesSuccess = (response) => {
    _logger(response.items);
    setimmigrantCategories((prevState) => {
      let ps = { ...prevState };
      ps.arrOfImmigrantCat = response.items.map(mapImmigrantCategories);
      return ps;
    });
  };
  const onGetAllImmigrantCategoriesError = (err) => {
    _logger(err);
  };
  const onGetAllSurveyRequirmentsSuccess = (response) => {
    setSurveyRequirements((prevState) => {
      let ps = { ...prevState };
      ps.arrofRequirements = response.items.map(mapSurveyRequirments);
      return ps;
    });
  };
  const onGetAllSurveyRequirmentsError = (err) => {
    _logger(err);
  };
  const mapNonImmigrantCategories = (values) => {
    return (
      <option key={values.id} value={values.id}>
        {values.visaCategory}
      </option>
    );
  };
  const mapImmigrantCategories = (values) => {
    return (
      <option key={values.id} value={values.id}>
        {values.code}
      </option>
    );
  };
  const mapSurveyRequirments = (values) => {
    return (
      <option key={values.id} value={values.id}>
        {values.name}
      </option>
    );
  };
  return (
    <Fragment>
      <ProgressBar animated now={25} label={`${25}%`} />
      <Card className="border-0 mt-2">
        <Card.Header>
          <div className="mb-3 mb-lg-0">
            <h3 className="mb-0">Add Questionnaire</h3>
          </div>
        </Card.Header>
        <Card.Body className="text-center">
          <div>
            <h4 className="mb-0">Questionnaire Details</h4>
            <p className="mb-4">
              Please fill out the details. Ensure the details are correct. You
              will have a change to review them.
            </p>

            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={6} sm={12} className="mb-3">
                  <Form.Group className="mb-3" controlId="formFirstName">
                    <Form.Label>Name</Form.Label>
                    <Field
                      component="input"
                      name="name"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="name"
                      component={"div"}
                      className="text-danger"
                    />
                  </Form.Group>
                </Col>

                <Col md={6} sm={12} className="mb-3">
                  <Form.Group className="mb-3" controlId="formPhone">
                    <Form.Label>Status</Form.Label>
                    <Field
                      component="select"
                      name="statusId"
                      className="form-control"
                    >
                      <option></option>
                      <option value={1}>Active</option>
                      <option value={2}>InActive</option>
                      <option value={3}>Pending</option>
                      <option value={4}>Canceled</option>
                    </Field>
                    <ErrorMessage
                      name="statusId"
                      component={"div"}
                      className="text-danger"
                    />
                  </Form.Group>
                </Col>

                <Col md={6} sm={12} className="mb-3">
                  <Form.Group className="mb-3" controlId="formBirthday">
                    <Form.Label>Type of Visa</Form.Label>
                    <Field
                      component="select"
                      name="entityTypeId"
                      className="form-control"
                    >
                      <option></option>
                      <option value={5}>ImmigrantVisa</option>
                      <option value={6}>NonImmigrantVisa</option>
                    </Field>
                    <ErrorMessage
                      name="entityTypeId"
                      component={"div"}
                      className="text-danger"
                    />
                  </Form.Group>
                </Col>

                <Col md={6} sm={12} className="mb-3">
                  <Form.Group className="mb-3" controlId="formBirthday">
                    <Form.Label>Questionnaire Type</Form.Label>
                    <Field
                      component="select"
                      name="surveyTypeId"
                      className="form-control"
                    >
                      <option></option>
                      <option value={1}>Default</option>
                      <option value={2}>Draft</option>
                    </Field>
                    <ErrorMessage
                      name="surveyTypeId"
                      component={"div"}
                      className="text-danger"
                    />
                  </Form.Group>
                </Col>
                <Col md={6} sm={12} className="mb-3">
                  <Form.Group className="mb-3" controlId="formBirthday">
                    <Form.Label>Visa</Form.Label>
                    <Field
                      component="select"
                      name="visaId"
                      className="form-control"
                    >
                      {immigrantCategories?.arrOfImmigrantCat}
                    </Field>
                    <ErrorMessage
                      name="visaId"
                      component={"div"}
                      className="text-danger"
                    />
                  </Form.Group>
                </Col>

                <Col md={6} sm={12} className="mb-3">
                  <Form.Group className="mb-3" controlId="formBirthday">
                    <Form.Label>Requirement</Form.Label>
                    <Field
                      component="select"
                      name="requirementId"
                      className="form-control"
                    >
                      <option></option>
                      {surveyRequirements?.arrofRequirements}
                    </Field>
                    <ErrorMessage
                      name="requirementId"
                      component={"div"}
                      className="text-danger"
                    />
                  </Form.Group>
                </Col>
                <Col md={12} sm={12} className="mb-3">
                  <Form.Group className="mb-3" controlId="formLastName">
                    <Form.Label>Description</Form.Label>
                    <Field
                      component="textarea"
                      name="description"
                      className="form-control"
                      rows="6"
                    />
                    <ErrorMessage
                      name="description"
                      component={"div"}
                      className="text-danger"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row md={12} sm={12}>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="btn btn-primary d-flex justify-content-center w-30"
                >
                  {nextLabel}
                </button>
              </Row>
            </Form>
          </div>
        </Card.Body>
      </Card>
    </Fragment>
  );
}
export default withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => ({
    name: props.formData.name,
    description: props.formData.description,
    statusId: props.formData.statusId,
    surveyTypeId: props.formData.surveyTypeId,
    entityTypeId: props.formData.entityTypeId,
    visaId: props.formData.visaId,
    requirementId: props.formData.requirementId,
  }),
  validationSchema: addSurveySchema,
  handleSubmit: function (values, { props }) {
    props.onNext(values);
  },
})(SurveyForm);
SurveyForm.propTypes = {
  values: PropTypes.shape({
    name: PropTypes.string,
    statusId: PropTypes.string,
    surveyTypeId: PropTypes.string,
    entityTypeId: PropTypes.string,
    visaId: PropTypes.string,
    requirementId: PropTypes.string,
    description: PropTypes.string,
    id: PropTypes.number,
    visaCategory: PropTypes.string,
    code: PropTypes.string,
  }),
  data: PropTypes.shape({
    Name: PropTypes.string,
  }).isRequired,
  formData: PropTypes.shape({
    surveyTypeId: PropTypes.string,
  }),
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  isSubmitting: PropTypes.bool,
  onBack: PropTypes.func,
  onNext: PropTypes.func,
  nextLabel: PropTypes.string,
};
