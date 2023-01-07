﻿using Amazon.Runtime;
using Amazon.Runtime.Internal.Util;
using Amazon.S3.Model;
using Google.Apis.AnalyticsReporting.v4;
using Google.Apis.AnalyticsReporting.v4.Data;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Services;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Sabio.Models.AppSettings;
using Sabio.Models.Domain;
using Sabio.Models.Requests.GoogleAnalytic;
using Sabio.Services.Interfaces;
using Stripe;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using DateRange = Google.Apis.AnalyticsReporting.v4.Data.DateRange;
using Metric = Google.Apis.AnalyticsReporting.v4.Data.Metric;

namespace Sabio.Services
{
    public class GoogleAnalyticService : IGoogleAnalyticService
    {
   
        private readonly IWebHostEnvironment _webHostEnvironment;
        public GoogleAnalyticService(IWebHostEnvironment webHostEnvironment)
        {
            
            _webHostEnvironment = webHostEnvironment;
        }
        public GetReportsResponse GetMoreAnalytics(GoogleAnalyticMetricDimensionRequest model)
        {
            GoogleCredential credential = GoogleCreds();

            using (var svc = new AnalyticsReportingService(
                new BaseClientService.Initializer
                {
                    HttpClientInitializer = credential,
                    ApplicationName = "Migrately"
                })
            )
            {

                DateRange dateRange = Dates(model);

                List<Metric> listOfMetrics = null;
                Metric metric = null;
                foreach (string newMetric in model.Metric)
                {
                    metric = new Metric { Expression = $"ga:{newMetric}", Alias = $"{newMetric}" };
                    if (listOfMetrics == null)
                    {
                        listOfMetrics = new List<Metric>();
                    }
                    listOfMetrics.Add(metric);
                }

                List<Dimension> listOfDemension = null;
                Dimension dimension = null;
                foreach (string newDimension in model.Dimension)
                {
                    dimension = new Dimension { Name = $"ga:{newDimension}" };
                    if (listOfDemension == null)
                    {
                        listOfDemension = new List<Dimension>();
                    }
                    listOfDemension.Add(dimension);
                }


                ReportRequest reportRequest = new ReportRequest
                {

                    ViewId = "280646633",
                    DateRanges = new List<DateRange> { dateRange },
                    Dimensions = listOfDemension,
                    Metrics = listOfMetrics

                };

                GetReportsResponse response = GetRequest(svc, reportRequest);

                return response;
            }
        }

      

        public GetReportsResponse GetBasicAnalytics(GoogleAnalyticRequest model)
        {
            GoogleCredential credential = GoogleCreds();

            using (var svc = new AnalyticsReportingService(
                new BaseClientService.Initializer
                {
                    HttpClientInitializer = credential,
                    ApplicationName = "Migrately"
                })
            )
            {

                DateRange dateRange = Dates(model);

                Metric metric = new Metric { Expression = $"ga:users", Alias = "users" };
                Metric metricTwo = new Metric { Expression = $"ga:uniquePageViews", Alias = "uniquePageViews" };
                Metric metricThree = new Metric { Expression = $"ga:bounces", Alias = "bounces" };
                Metric metricFour = new Metric { Expression = $"ga:avgSessionDuration", Alias = "avgSessionDuration" };

                Dimension dimension = new Dimension { Name = "ga:pagePath" };
                ReportRequest reportRequest = new ReportRequest
                {

                    ViewId = "280646633",
                    DateRanges = new List<DateRange> { dateRange },
                    Dimensions = new List<Dimension> { dimension },
                    Metrics = new List<Metric> { metric, metricTwo, metricThree, metricFour }

                };

                GetReportsResponse response = GetRequest(svc, reportRequest);


                return response;
            }

        }
        public GetReportsResponse GetPageViewData(GoogleAnalyticRequest model)
        {
            GoogleCredential credential = GoogleCreds();

            using (var svc = new AnalyticsReportingService(
                new BaseClientService.Initializer
                {
                    HttpClientInitializer = credential,
                    ApplicationName = "Migrately"
                })
            )
            {

                DateRange dateRange = Dates(model);

                Metric metric = new Metric { Expression = $"ga:pageviews", Alias = "PageViews" };


                Dimension dimension = new Dimension { Name = "ga:pagePath" };
                ReportRequest reportRequest = new ReportRequest
                {

                    ViewId = "280646633",
                    DateRanges = new List<DateRange> { dateRange },
                    Dimensions = new List<Dimension> { dimension },
                    Metrics = new List<Metric> { metric }

                };

                GetReportsResponse response = GetRequest(svc, reportRequest);

                return response;
            }

        }


        public GetReportsResponse GetUserActionData(GoogleAnalyticRequest model)
        {
            GoogleCredential credential = GoogleCreds();

            using (var svc = new AnalyticsReportingService(
                new BaseClientService.Initializer
                {
                    HttpClientInitializer = credential,
                    ApplicationName = "Migrately"
                })
            )
            {
                DateRange dateRange = Dates(model);

                Metric metric = new Metric { Expression = $"ga:totalEvents", Alias = "TotalEvents" };

                Dimension dimension = new Dimension { Name = "ga:eventAction" };
                ReportRequest reportRequest = new ReportRequest
                {

                    ViewId = "280646633",
                    DateRanges = new List<DateRange> { dateRange },
                    Dimensions = new List<Dimension> { dimension },
                    Metrics = new List<Metric> { metric }

                };

                GetReportsResponse response = GetRequest(svc, reportRequest);


                return response;
            }

        }

        private static DateRange Dates(GoogleAnalyticRequest model)
        {
            return new DateRange() { StartDate = model.StartDate, EndDate = model.EndDate };
        }

        private static GetReportsResponse GetRequest(AnalyticsReportingService svc, ReportRequest reportRequest)
        {
            List<ReportRequest> requests = new List<ReportRequest>();
            requests.Add(reportRequest);

            GetReportsRequest getReport = new GetReportsRequest() { ReportRequests = requests };

            GetReportsResponse response = svc.Reports.BatchGet(getReport).Execute();
            return response;
        }
        private GoogleCredential GoogleCreds()
        {
            return GoogleCredential.FromFile($"{_webHostEnvironment.WebRootPath}/Keys/GoogleAnalyticAccCred.json").CreateScoped(new[] { AnalyticsReportingService.Scope.AnalyticsReadonly });
        }
    }
}
