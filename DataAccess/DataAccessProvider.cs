
using ArdaHw3.Models;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace ArdaHw3.DataAccess
{
    public class DataAccessProvider : IDataAccessProvider
    {
        private readonly PostgreSqlContext _context;

        public DataAccessProvider(PostgreSqlContext context)
        {
            _context = context;
        }

        public void AddEventRecord(Event ev)
        {
            _context.events.Add(ev);
            _context.SaveChanges();
        }

        public void UpdateEventRecord(Event ev)
        {
            _context.events.Update(ev);
            _context.SaveChanges();
        }

        public void DeleteEventRecord(int id)
        {
            var entity = _context.events.FirstOrDefault(t => t.id == id);
            _context.events.Remove(entity);
            _context.SaveChanges();
        }

        public Event GetEventSingleRecord(int id)
        {
            return _context.events.FirstOrDefault(t => t.id == id);
        }

        public List<Event> GetEventRecords()
        {
            return _context.events.ToList();
        }
        //burdan sonrası type la alakalı
        public List<Type> GetTypeRecords()
        {
            return _context.types.ToList();
        }
        public void AddTypeRecord(Type tp)
        {
            _context.types.Add(tp);
            _context.SaveChanges();
        }

        public void UpdateTypeRecord(Type tp)
        {
            _context.types.Update(tp);
            _context.SaveChanges();
        }

        public void DeleteTypeRecord(int id)
        {
            var entity = _context.types.FirstOrDefault(t => t.id == id);
            _context.types.Remove(entity);
            _context.SaveChanges();
        }

        public Models.Type GetTypeSingleRecord(int id)
        {
            return _context.types.FirstOrDefault(t => t.id == id);
        }
    }
}
