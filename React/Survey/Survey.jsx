import React, { useState } from "react";
import Loki from "react-loki";
import SurveyForm from "./SurveyForm";
import SurveyReview from "./SurveyReview";
import { BsFileText, BsBook, BsPen } from "react-icons/bs";
import surveyService from "services/surveyService";
import toastr from "toastr";
import AddSurveyQuestion from "./AddSurveyQuestion";
import surveyQuestionService from "services/SurveyQuestionService";
function Survey() {
  const [formValue, setFormValue] = useState({
    name: "",
    description: "",
    statusId: "",
    surveyTypeId: "",
    entityTypeId: "",
    visaId: "",
    requirementId: "",
  });
  const [questionData, setQuestionData] = useState({
    question: "",
    helpText: "",
    surveyId: "",
    statusId: 1,
    sortOrder: "",
    Answers: [{ text: "", nextQuestionId: 0, answerRequirementId: 0 }],
  });
  const getFormData = (values) => {
    var data = {
      name: values?.name,
      description: values?.description,
      statusId: values?.statusId,
      surveyTypeId: values?.surveyTypeId,
      entityTypeId: values?.entityTypeId,
      visaId: values?.visaId,
      requirementId: values?.requirementId,
    };
    return data;
  };
  const getQuestionAnswerData = (values) => {
    var data = {
      question: values?.question,
      helpText: values?.helpText,
      surveyId: values?.surveyId,
      statusId: values?.statusId,
      sortOrder: parseInt(values?.sortOrder),
      Answers: values?.Answers,
    };
    return data;
  };

  const onSubmit = (values) => {
    let payload = getFormData(values);

    if (
      payload.name === "" ||
      payload.entityTypeId === "" ||
      payload.description === "" ||
      payload.statusId === "" ||
      payload.visaId === "" ||
      payload.surveyTypeId === "" ||
      payload.requirementId === ""
    ) {
      toastr.error("Ensure all fields are filled out");
      return;
    } else {
      surveyService
        .addSurvey(payload)
        .then(onAddSurveySuccess)
        .catch(onAddSurveyError);
    }
  };
  const onQuestionSubmit = (values) => {
    let payload = getQuestionAnswerData(values);
    surveyQuestionService
      .InsertNewQuestionAndAnswers(payload)
      .then(onQuestionAnswerSuccess)
      .catch(onQuestionAnswerError);
  };
  const onQuestionAnswerSuccess = () => {
    toastr.success("Question and Answer Created");
  };
  const onQuestionAnswerError = () => {
    toastr.error("error");
  };
  const onAddSurveySuccess = (response) => {
    toastr.success("Survey Created");
    setQuestionData((prevState) => {
      let ps = { ...prevState };
      ps = [
        {
          question: "",
          helpText: "",
          surveyId: response.item,
          statusId: 1,
          sortOrder: "",

          Answers: [{ text: "", nextQuestionId: 0, answerRequirementId: 1 }],
        },
      ];
      return ps;
    });
  };
  const onAddSurveyError = () => {
    toastr.error("Error");
  };
  const mergeValues = (values) => {
    setFormValue((prevState) => {
      return { ...prevState, ...values };
    });
  };

  const surveySteps = [
    {
      label: "Step 1",
      component: <SurveyForm formData={formValue} />,
      icon: <BsFileText />,
    },
    {
      label: "Step 2",
      component: <SurveyReview formData={formValue} onFinish={onSubmit} />,
      icon: <BsBook />,
    },
    {
      label: "Step 3",
      component: (
        <AddSurveyQuestion
          questionData={questionData}
          onFinish={onQuestionSubmit}
        />
      ),
      icon: <BsPen />,
    },
  ];
  return (
    <Loki
      steps={surveySteps}
      onNext={mergeValues}
      onBack={mergeValues}
      onFinish={onSubmit}
      backLabel={"Back"}
      nextLabel={"Next Page"}
      noActions
    ></Loki>
  );
}
export default Survey;
