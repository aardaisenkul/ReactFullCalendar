using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ArdaHw3.DataAccess;
using ArdaHw3.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ArdaHw3.Controllers
{

    [Route("api/[controller]")]
    public class EventsController : ControllerBase
    {
        private readonly IDataAccessProvider _dataAccessProvider;

        public EventsController(IDataAccessProvider dataAccessProvider)
        {
            _dataAccessProvider = dataAccessProvider;
        }

        [HttpGet]
        public IEnumerable<Event> Get()
        {
            return _dataAccessProvider.GetEventRecords();
        }

        [HttpPost]
        public IActionResult Create([FromBody]Event ev)
        {
            if (ModelState.IsValid)
            {
                //Guid obj = Guid.NewGuid();
                //ev.Id = obj.ToString();
                _dataAccessProvider.AddEventRecord(ev);
                return Ok();
            }
            return BadRequest();
        }

        [HttpGet("{id}")]
        public Event Details(int id)
        {
            return _dataAccessProvider.GetEventSingleRecord(id);
        }

        [HttpPut]
        public IActionResult Edit([FromBody] Event ev)
        {
            if (ModelState.IsValid)
            {
                _dataAccessProvider.UpdateEventRecord(ev);
                return Ok();
            }
            return BadRequest();
        }

        [HttpDelete("{id}")]
        [Route("DeleteEventDetails/{id}")]
        public IActionResult DeleteConfirmed(int id)
        {
            var data = _dataAccessProvider.GetEventSingleRecord(id);
            if (data == null)
            {
                return NotFound();
            }
            _dataAccessProvider.DeleteEventRecord(id);
            return Ok();
        }
    }
}
