using Application.Attachments.Commands;
using Application.Collaborators.Queries;
using Application.Common.Interfaces;
using DevExtreme.AspNet.Data.ResponseModel;
using Domain.Entities;
using Domain.Enums;
using MediatR;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Utility.DTOs;

namespace Application.Collaborators.Commands;

public record CreateCollaboratorCommand : IRequest<Response<bool>>
{
    public string CompleteName { get; set; }
    public string RUT { get; set; }
    public string Area { get; set; }
    public int LeadershipId { get; set; }
    public string Position { get; set; }
    public string Phone { get; set; }
    public string Email { get; set; }
    public ECollaboratorStatus ECollaboratorStatus { get; set; }
    public IFormFile Photo { get; set; }
}

public class CreateCollaboratorCommandHandler
    (
        IRepository<Collaborator> _repository,
        IMediator _mediator
    )
    : IRequestHandler<CreateCollaboratorCommand, Response<bool>>
{
    public async Task<Response<bool>> Handle(CreateCollaboratorCommand request, CancellationToken cancellationToken)
    {
        Response<bool> result = new();
        try
		{
            var collaborator = new Collaborator()
            {
                CompleteName = request.CompleteName,
                RUT = request.RUT,
                Area = request.Area,
                LeadershipId = request.LeadershipId,
                Position = request.Position,
                Phone = request.Phone,
                ECollaboratorStatus = request.ECollaboratorStatus,
                Email = request.Email,
                Active = true
            };

            _repository.Add(collaborator);
            _repository.Save();

            _mediator.Send(new AddAttachmentsCommand { CollaboratorId = collaborator.Id, AttachmentType = EAttachmentType.Photo, Attachment = request.Photo });
		}
		catch (Exception ex)
		{
            result.ErrorProvider.AddError(ex.Source, ex.GetBaseException().Message);
        }
		return result;
    }
}

