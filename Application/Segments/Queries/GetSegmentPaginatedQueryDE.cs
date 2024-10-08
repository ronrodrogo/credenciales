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

public class GetSegmentPaginatedQueryDE : IRequest<Response<LoadResult>>
{
    public DataSourceLoadOptionsBase Params { get; set; }
}

public class GetSegmentPaginatedQueryDEHandler
    (
        IRepository<Segment> _repository,
        IMapper _mapper
    ) 
    : IRequestHandler<GetSegmentPaginatedQueryDE, Response<LoadResult>>
{

    public async Task<Response<LoadResult>> Handle(GetSegmentPaginatedQueryDE request, CancellationToken cancellationToken)
    {
        Response<LoadResult> result = new();

        try
        {
            var filter = _repository.GetAll()
                        .AsNoTracking()
                        .OrderByDescending(x => x.Id);

            var loadResult = await DataSourceLoader.LoadAsync(filter, request.Params, cancellationToken);

            result.Result = loadResult;
        }
        catch (Exception ex)
        {
            result.ErrorProvider.AddError(ex.Source, ex.GetBaseException().Message);
        }

        return result;
    }

}
