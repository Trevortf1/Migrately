using Google.Apis.AnalyticsReporting.v4.Data;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.GoogleAnalytic
{
    public class GoogleAnalyticRequest 
    {
        [Required]
        [MinLength(1)]
        [MaxLength(30)]
        public string StartDate { get; set; }
        [Required]
        [MinLength(1)]
        [MaxLength(30)]
        public string EndDate { get; set; }

     

    }
}
