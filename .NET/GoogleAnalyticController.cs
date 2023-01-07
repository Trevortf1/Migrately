using Amazon.Runtime.Internal.Util;
using Google.Apis.AnalyticsReporting.v4.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Models.Requests.GoogleAnalytic;
using Sabio.Services.Interfaces;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using System;
using System.CodeDom.Compiler;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/analytic")]
    [ApiController]
    public class GoogleAnalyticController : BaseApiController
    {
        private IGoogleAnalyticService _service = null;
        public GoogleAnalyticController(IGoogleAnalyticService service, ILogger<GoogleAnalyticController> logger) : base(logger)
        {
            _service = service; 
        }
        [HttpPost]
        public ActionResult RequestData(GoogleAnalyticMetricDimensionRequest model)
        {
            int code = 200;
            GetReportsResponse responseReport = null;   
            BaseResponse response = null;   
            try
            {
                responseReport = _service.GetMoreAnalytics(model);
                return StatusCode(code, responseReport);
            }
            catch (Exception ex)
            {
                code = 400;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
                return StatusCode(code, response);
            }
           
        }
        [HttpPost("basic")]
        public ActionResult RequestBasicData(GoogleAnalyticRequest model)
        {
            int code = 200;
            GetReportsResponse responseReport = null;
            BaseResponse response = null;
            try
            {
                responseReport = _service.GetBasicAnalytics(model);
                return StatusCode(code, responseReport);
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
                return StatusCode(code, response);
            }

        }

        [HttpPost("pageview")]
        public ActionResult RequestPageViews(GoogleAnalyticRequest model)
        {
            int code = 200;
            GetReportsResponse responseReport = null;
            BaseResponse response = null;
            try
            {
                responseReport = _service.GetPageViewData(model);
                return StatusCode(code, responseReport);
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
                return StatusCode(code, response);
            }

        }
        [HttpPost("useraction")]
        public ActionResult RequestUserAction(GoogleAnalyticRequest model)
        {
            int code = 200;
            GetReportsResponse responseReport = null;
            BaseResponse response = null;
            try
            {
                responseReport = _service.GetUserActionData(model);
                return StatusCode(code, responseReport);
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
                return StatusCode(code, response);
            }

        }
    }
}
