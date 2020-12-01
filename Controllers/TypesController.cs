using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ArdaHw3.DataAccess;
using ArdaHw3.Models;
using Microsoft.AspNetCore.Mvc;


namespace ArdaHw3.Controllers
{
    [Route("api/[controller]")]
    public class TypesController : ControllerBase
    {
        private readonly IDataAccessProvider _dataAccessProvider;

        public TypesController(IDataAccessProvider dataAccessProvider)
        {
            _dataAccessProvider = dataAccessProvider;
        }

        [HttpGet]
        public IEnumerable<Models.Type> Get()
        {
            return _dataAccessProvider.GetTypeRecords();
        }

        [HttpPost]
        public IActionResult Create([FromBody] Models.Type tp)
        {
            if (ModelState.IsValid)
            {
                //Guid obj = Guid.NewGuid();
                //ev.Id = obj.ToString();
                _dataAccessProvider.AddTypeRecord(tp);
                return Ok();
            }
            return BadRequest();
        }

        [HttpGet("{id}")]
        public Models.Type Details(int id)
        {
            return _dataAccessProvider.GetTypeSingleRecord(id);
        }

        [HttpPut]
        public IActionResult Edit([FromBody] Models.Type tp)
        {
            if (ModelState.IsValid)
            {
                _dataAccessProvider.UpdateTypeRecord(tp);
                return Ok();
            }
            return BadRequest();
        }

        [HttpDelete("{id}")]
        [Route("DeleteTypeDetails/{id}")]
        public IActionResult DeleteConfirmed(int id)
        {
            var data = _dataAccessProvider.GetTypeSingleRecord(id);
            if (data == null)
            {
                return NotFound();
            }
            _dataAccessProvider.DeleteTypeRecord(id);
            return Ok();
        }
    }
}
