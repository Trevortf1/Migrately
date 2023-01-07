import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { FieldArray, withFormik, Form, Field, ErrorMessage } from "formik";
import { Card, Row, ProgressBar, Col } from "react-bootstrap";
import addSurveyQuestionAnswerSchema from "schemas/addSurveyQuestionAnswerSchema";
import surveyQuestionService from "services/SurveyQuestionService";
import toastr from "toastr";
function AddSurveyQuestion(props) {
  const { isSubmitting, values, onFinish, resetForm } = props;

  const [questions, setQuestions] = useState({ arrOfQuestions: [] });
  const resetQuestionForm = () => {
    resetForm({
      values: {
        question: "",
        helpText: "",
        sortOrder: 0,
        statusId: 1,
        surveyId: props?.values?.surveyId || 0,
        Answers: [{ text: "", nextQuestionId: 0, answerRequirementId: 1 }],
      },
    });
    toastr.success("Reset Successful");
  };
  const questionSubmit = () => {
    onFinish(props?.values);
  };
  useEffect(() => {
    surveyQuestionService
      .getAllSurveyQuestions()
      .then(onGetAllQuestionSuccess)
      .catch(onGetAllQuestionError);
  }, []);

  const onGetAllQuestionSuccess = (response) => {
    setQuestions((prevState) => {
      let ps = { ...prevState };
      ps.arrOfQuestions = response.items.map(mapSurveyQuestion);
      return ps;
    });
  };
  const mapSurveyQuestion = (values) => {
    return (
      <option key={values.id} value={values.id}>
        {values.question}
      </option>
    );
  };

  const onGetAllQuestionError = (err) => {
    toastr.error(err);
  };
  return (
    <Fragment>
      <ProgressBar animated now={100} label={`${100}%`} />
      <Card>
        <Card.Header>
          <h3>Add Questions</h3>
        </Card.Header>
        <Card.Body>
          <Form>
            <Row>
              <Col md={6} sm={12}>
                <div className="text-decoration-underline">
                  <h4>Question:</h4>
                </div>
                <Field
                  name="question"
                  type="text"
                  className="form-control"
                ></Field>
                <ErrorMessage
                  name="question"
                  component={"div"}
                  className="text-danger"
                />
              </Col>
              <Col md={6} sm={12}>
                <div className="text-decoration-underline">
                  <h4>Help Text</h4>
                </div>
                <Field
                  type="text"
                  name="helpText"
                  className=" form-control"
                  placeholder="Enter a desc"
                ></Field>
                <ErrorMessage
                  name="helpText"
                  component={"div"}
                  className="text-danger"
                />
              </Col>
              <Col md={6} sm={12}>
                <div className="text-decoration-underline pt-2">
                  <h4>Assign the order:</h4>
                </div>
                <Field as="select" name={`sortOrder`} className="form-control">
                  <option value={1}>First</option>
                  <option value={2}>Second</option>
                  <option value={3}>Third</option>
                  <option value={4}>Fourth</option>
                  <option value={5}>Fifth</option>
                </Field>
                <ErrorMessage
                  name="sortOrder"
                  component={"div"}
                  className="text-danger"
                />
              </Col>
              <hr className="mt-3" />
              <FieldArray
                name="Answers"
                render={({ remove, push }) => (
                  <div>
                    {values.Answers.length > 0 &&
                      values.Answers.map((answer, index) => (
                        <div key={index}>
                          <Row>
                            <Col md={6} sm={12}>
                              <h4 className="text-decoration-underline">
                                Answer:
                              </h4>
                              <Field
                                name={`Answers.${index}.text`}
                                type="text"
                                className="form-control mt-1"
                              ></Field>
                              {index > 0 && (
                                <button
                                  type="button"
                                  onClick={() => remove(index)}
                                  className="btn btn-primary btn-sm mt-1"
                                >
                                  Remove
                                </button>
                              )}
                              <button
                                type="button"
                                className="btn btn-primary btn-sm mt-1 mx-2"
                                onClick={() => push({ text: "" })}
                              >
                                Add
                              </button>
                            </Col>
                            <Col md={6} sm={12}>
                              <h4 className="text-decoration-underline">
                                Follow on Question:
                              </h4>
                              <Field
                                name={`Answers.${index}.nextQuestionId`}
                                as="select"
                                className="form-control mt-1"
                              >
                                <option></option>
                                {questions?.arrOfQuestions}
                              </Field>
                            </Col>

                            <Col md={6} sm={12}>
                              <h4 className="text-decoration-underline pt-2">
                                Answer Display:
                              </h4>
                              <Field
                                name={`Answers.${index}.answerRequirementId`}
                                as="select"
                                className="form-control mt-1"
                              >
                                {" "}
                                <option value={1}>No Preference</option>
                                <option value={2}>Dropdown</option>
                                <option value={3}>Input</option>
                              </Field>
                            </Col>
                          </Row>
                          <hr />
                        </div>
                      ))}
                  </div>
                )}
              ></FieldArray>
            </Row>
          </Form>
        </Card.Body>

        <Row md={6} sm={12}>
          <button
            type="button"
            onClick={questionSubmit}
            disabled={isSubmitting}
            className="btn btn-primary mx-3 mt-1"
          >
            Submit Question
          </button>
        </Row>

        <Row md={6} sm={12}>
          <button
            type="button"
            onClick={resetQuestionForm}
            disabled={isSubmitting}
            className="btn btn-warning mx-3 mt-1"
          >
            Reset
          </button>
        </Row>
      </Card>
    </Fragment>
  );
}

export default withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => ({
    question: props?.questionData?.[0]?.question || "",
    helpText: props?.questionData?.[0]?.helpText || "",
    statusId: props?.questionData?.[0]?.statusId || 1,
    sortOrder: props?.questionData?.[0]?.sortOrder || 0,
    surveyId: props?.questionData?.[0]?.surveyId || 0,
    Answers: [
      {
        text: props?.questionData?.Answers?.[0]?.text || "",
        nextQuestionId: props?.questionData?.Answers?.[0]?.nextQuestionId || 0,
        answerRequirementId:
          props?.questionData?.Answers?.[0]?.answerRequirementId || 1,
      },
    ],
  }),
  validationSchema: addSurveyQuestionAnswerSchema,
  handleSubmit: function (values, { props }) {
    props.onNext(values);
  },
})(AddSurveyQuestion);

AddSurveyQuestion.propTypes = {
  values: PropTypes.shape({
    id: PropTypes.number,
    question: PropTypes.string,
    text: PropTypes.string,
    surveyId: PropTypes.number,
  }),
  isSubmitting: PropTypes.bool,
  onBack: PropTypes.func,
  onNext: PropTypes.func,
  nextLabel: PropTypes.string,
  backLabel: PropTypes.string,
  onFinish: PropTypes.func,
  resetForm: PropTypes.func,
};
