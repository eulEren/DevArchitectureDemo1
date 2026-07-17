
using Business.Handlers.Colors.Commands;
using FluentValidation;

namespace Business.Handlers.Colors.ValidationRules
{

    public class CreateColorValidator : AbstractValidator<CreateColorCommand>
    {
        public CreateColorValidator()
        {
            RuleFor(x => x.CreatedUserId).NotEmpty();
            RuleFor(x => x.CreatedDate).NotEmpty();
            RuleFor(x => x.LastUpdatedUserId).NotEmpty();
            RuleFor(x => x.LastUpdatedDate).NotEmpty();
            RuleFor(x => x.Status).NotEmpty();
            RuleFor(x => x.Name).NotEmpty();

        }
    }
    public class UpdateColorValidator : AbstractValidator<UpdateColorCommand>
    {
        public UpdateColorValidator()
        {
            RuleFor(x => x.CreatedUserId).NotEmpty();
            RuleFor(x => x.CreatedDate).NotEmpty();
            RuleFor(x => x.LastUpdatedUserId).NotEmpty();
            RuleFor(x => x.LastUpdatedDate).NotEmpty();
            RuleFor(x => x.Status).NotEmpty();
            RuleFor(x => x.IsDeleted).NotEmpty();
            RuleFor(x => x.Name).NotEmpty();

        }
    }
}