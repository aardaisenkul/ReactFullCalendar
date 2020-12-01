using System;
namespace ArdaHw3.Models
{
    public class Event
    {
        public int id { get; set; }

        public string customer { get; set; }

        public string project { get; set; }

        public string type { get; set; }

        public string hours { get; set; }

        public DateTime start { get; set; }

        public DateTime end { get; set; }

        public string description { get; set; }

        public bool allDay { get; set; }

    }
}
