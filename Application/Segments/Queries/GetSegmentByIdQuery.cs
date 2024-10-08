using Application.Collaborators.Queries.DTOs;
using Application.Common.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using DevExtreme.AspNet.Data;
using DevExtreme.AspNet.Data.ResponseModel;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Utility.DTOs;


namespace Application.Segments.Queries;

public class GetSegmentByIdQuery : IRequest<Response<Segment>>
{
    public int Id { get; set; }
}

public class GetSegmentByIdQueryHandler
    (
        IRepository<Segment> _repository,
        IMapper _mapper
    ) 
    : IRequestHandler<GetSegmentByIdQuery, Response<Segment>>
{

    public async Task<Response<Segment>> Handle(GetSegmentByIdQuery request, CancellationToken cancellationToken)
    {
        Response<Segment> result = new();

        try
        {
            var data = _repository.GetAll()
                        .Where(x => x.Id == request.Id)
                        .FirstOrDefault();

            result.Result = data;
        }
        catch (Exception ex)
        {
            result.ErrorProvider.AddError(ex.Source, ex.GetBaseException().Message);
        }

        return result;
    }

}
