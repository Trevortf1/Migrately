using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.GoogleAnalytic
{
    public class GoogleAnalyticMetricDimensionRequest : GoogleAnalyticRequest
    {
        [Required]
        [MinLength(1)]
        [MaxLength(200)]
        public List<string> Dimension { get; set; }
        [Required]
        [MinLength(1)]
        [MaxLength(200)]
        public List<string> Metric { get; set; }
    }
}
